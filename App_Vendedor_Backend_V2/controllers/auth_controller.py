# -*- coding: utf-8 -*-

import json
import logging
import jwt

from datetime import datetime, timedelta

from odoo import http, fields
from odoo.http import request, Response
from odoo.exceptions import AccessDenied, ValidationError


_logger = logging.getLogger(__name__)


# =====================================================
# Helpers
# =====================================================

def json_response(data=None, message='', status=200, success=True):
    """Standard REST JSON response"""
    body = {
        'success': success,
        'message': message,
        'data': data or {}
    }

    return Response(
        json.dumps(body),
        status=status,
        content_type='application/json'
    )


def now_utc():
    # Odoo expects naive UTC datetimes in ORM fields/domains.
    return fields.Datetime.now()


# =====================================================
# JWT Utils
# =====================================================

def get_jwt_config():
    ICP = request.env['ir.config_parameter'].sudo()

    return {
        'secret': ICP.get_param('jwt.secret_key') or 'dev_secret',
        'algorithm': ICP.get_param('jwt.algorithm') or 'HS256',
        'access_exp': int(ICP.get_param('jwt.access_token_expiry', 3600)),
        'refresh_exp': int(ICP.get_param('jwt.refresh_token_expiry', 2592000)),
    }


def encode_jwt(payload, secret, algorithm):

    token = jwt.encode(payload, secret, algorithm=algorithm)

    if isinstance(token, bytes):
        token = token.decode('utf-8')

    return token


def verify_jwt(token):
    try:
        cfg = get_jwt_config()

        payload = jwt.decode(
            token,
            cfg['secret'],
            algorithms=[cfg['algorithm']]
        )

        record = request.env['jwt.token'].sudo().search([
            ('token', '=', token),
            ('is_revoked', '=', False),
            ('expires_at', '>', now_utc()),
        ], limit=1)

        if not record:
            return False, 'Token invalid or expired'

        return True, payload

    except jwt.ExpiredSignatureError:
        return False, 'Token expired'

    except jwt.InvalidTokenError:
        return False, 'Invalid token'

    except Exception as e:
        _logger.exception(e)
        return False, 'Token verification failed'


def generate_tokens(user):

    cfg = get_jwt_config()

    now = now_utc()

    # Access
    access_payload = {
        'user_id': user.id,
        'login': user.login,
        'type': 'access',
        'iat': now,
        'exp': now + timedelta(seconds=cfg['access_exp'])
    }

    # Refresh
    refresh_payload = {
        'user_id': user.id,
        'type': 'refresh',
        'iat': now,
        'exp': now + timedelta(seconds=cfg['refresh_exp'])
    }

    access_token = encode_jwt(
        access_payload,
        cfg['secret'],
        cfg['algorithm']
    )

    refresh_token = encode_jwt(
        refresh_payload,
        cfg['secret'],
        cfg['algorithm']
    )

    env = request.env['jwt.token'].sudo()

    env.create({
        'user_id': user.id,
        'token': access_token,
        'token_type': 'access',
        'expires_at': now + timedelta(seconds=cfg['access_exp']),
    })

    env.create({
        'user_id': user.id,
        'token': refresh_token,
        'token_type': 'refresh',
        'expires_at': now + timedelta(seconds=cfg['refresh_exp']),
    })

    return access_token, refresh_token


# =====================================================
# Main Controller
# =====================================================

class AuthController(http.Controller):

    # -----------------------------------------
    # REGISTER
    # -----------------------------------------

    @http.route(
        '/api/auth/register',
        type='http',
        auth='public',
        methods=['POST'],
        csrf=False,
        cors='*'
    )
    def register(self):

        try:

            data = request.httprequest.get_json(silent=True) or {}

            required = ['first_name', 'last_name', 'email', 'password']

            for field in required:
                if not data.get(field):
                    return json_response(
                        message=f'{field} is required',
                        status=400,
                        success=False
                    )

            email = data['email'].lower().strip()

            exists = request.env['res.users'].sudo().search([
                ('login', '=', email)
            ], limit=1)

            if exists:
                return json_response(
                    message='Email already registered',
                    status=409,
                    success=False
                )

            user = request.env['res.users'].sudo().create({
                'name': f"{data['first_name']} {data['last_name']}",
                'login': email,
                'email': email,
                'password': data['password'],
            })

            access, refresh = generate_tokens(user)

            return json_response(
                data={
                    'user_id': user.id,
                    'access_token': access,
                    'refresh_token': refresh,
                },
                message='Registered successfully',
                status=201
            )

        except Exception as e:

            _logger.exception(e)

            return json_response(
                message='Registration failed',
                status=500,
                success=False
            )

    # -----------------------------------------
    # LOGIN
    # -----------------------------------------

    @http.route(
        '/api/auth/login',
        type='http',
        auth='public',
        methods=['POST'],
        csrf=False,
        cors='*'
    )
    def login(self):

        try:

            data = request.httprequest.get_json(silent=True) or {}

            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return json_response(
                    message='Email and password required',
                    status=400,
                    success=False
                )

            try:
                user_agent_env = getattr(request, 'httprequest', None)
                user_agent_env = getattr(user_agent_env, 'environ', {}) or {}

                # Odoo 19: authenticate expects a credential dict.
                try:
                    credential = {
                        'type': 'password',
                        'login': email,
                        'password': password,
                    }
                    auth_info = request.env['res.users'].sudo().authenticate(
                        credential,
                        user_agent_env
                    )
                    uid = auth_info and auth_info.get('uid')
                except Exception:
                    # Fallback: direct credential check on the user record.
                    user = request.env['res.users'].sudo().search(
                        [('login', '=', email)],
                        limit=1
                    )
                    if not user:
                        uid = False
                    else:
                        try:
                            user._check_credentials(password, user_agent_env)
                        except TypeError:
                            user._check_credentials(password)
                        uid = user.id
            except AccessDenied:
                uid = False

            if not uid:
                return json_response(
                    message='Invalid credentials',
                    status=401,
                    success=False
                )

            user = request.env['res.users'].sudo().browse(uid)

            access, refresh = generate_tokens(user)

            return json_response(
                data={
                    'user_id': user.id,
                    'access_token': access,
                    'refresh_token': refresh,
                },
                message='Login successful'
            )

        except Exception as e:

            _logger.exception(e)

            return json_response(
                message='Login failed',
                status=500,
                success=False
            )

    # -----------------------------------------
    # REFRESH
    # -----------------------------------------

    @http.route(
        '/api/auth/refresh',
        type='http',
        auth='public',
        methods=['POST'],
        csrf=False,
        cors='*'
    )
    def refresh(self):

        try:

            data = request.httprequest.get_json(silent=True) or {}

            token = data.get('refresh_token')

            if not token:
                return json_response(
                    message='Refresh token required',
                    status=400,
                    success=False
                )

            valid, payload = verify_jwt(token)

            if not valid:
                return json_response(
                    message=payload,
                    status=401,
                    success=False
                )

            if payload.get('type') != 'refresh':
                return json_response(
                    message='Invalid token type',
                    status=400,
                    success=False
                )

            user = request.env['res.users'].sudo().browse(
                payload['user_id']
            )

            access, _ = generate_tokens(user)

            return json_response(
                data={'access_token': access},
                message='Token refreshed'
            )

        except Exception as e:

            _logger.exception(e)

            return json_response(
                message='Refresh failed',
                status=500,
                success=False
            )

    # -----------------------------------------
    # LOGOUT
    # -----------------------------------------

    @http.route(
        '/api/auth/logout',
        type='http',
        auth='public',
        methods=['POST'],
        csrf=False,
        cors='*'
    )
    def logout(self):

        try:

            auth = request.httprequest.headers.get('Authorization')

            if not auth or not auth.startswith('Bearer '):
                return json_response(
                    message='Missing token',
                    status=401,
                    success=False
                )

            token = auth.split(' ')[1]

            valid, payload = verify_jwt(token)

            if not valid:
                return json_response(
                    message=payload,
                    status=401,
                    success=False
                )

            request.env['jwt.token'].sudo().search([
                ('user_id', '=', payload['user_id']),
                ('is_revoked', '=', False)
            ]).write({'is_revoked': True})

            return json_response(
                message='Logout successful'
            )

        except Exception as e:

            _logger.exception(e)

            return json_response(
                message='Logout failed',
                status=500,
                success=False
            )

    # -----------------------------------------
    # PROFILE
    # -----------------------------------------

    @http.route(
        '/api/user/profile',
        type='http',
        auth='public',
        methods=['GET'],
        csrf=False,
        cors='*'
    )
    def profile(self):

        try:

            auth = request.httprequest.headers.get('Authorization')

            if not auth or not auth.startswith('Bearer '):
                return json_response(
                    message='Missing token',
                    status=401,
                    success=False
                )

            token = auth.split(' ')[1]

            valid, payload = verify_jwt(token)

            if not valid:
                return json_response(
                    message=payload,
                    status=401,
                    success=False
                )

            user = request.env['res.users'].sudo().browse(
                payload['user_id']
            )

            data = {
                'id': user.id,
                'name': user.name,
                'email': user.login,
            }

            return json_response(
                data=data,
                message='Profile loaded'
            )

        except Exception as e:

            _logger.exception(e)

            return json_response(
                message='Profile failed',
                status=500,
                success=False
            )
