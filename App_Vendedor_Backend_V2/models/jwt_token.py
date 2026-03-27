# -*- coding: utf-8 -*-
from odoo import models, fields, api
from datetime import datetime, timedelta


class JWTToken(models.Model):
    _name = 'jwt.token'
    _description = 'JWT Token Storage'
    _order = 'create_date desc'

    user_id = fields.Many2one('res.users', string='User', required=True, ondelete='cascade', index=True)
    token = fields.Char(string='Token', required=True, index=True)
    token_type = fields.Selection([
        ('access', 'Access Token'),
        ('refresh', 'Refresh Token')
    ], string='Token Type', required=True, default='access')
    expires_at = fields.Datetime(string='Expires At', required=True, index=True)
    is_revoked = fields.Boolean(string='Revoked', default=False, index=True)
    device_info = fields.Char(string='Device Info')
    ip_address = fields.Char(string='IP Address')

    @api.model
    def cleanup_expired_tokens(self):
        """Cron job to clean up expired tokens"""
        expired_tokens = self.search([
            ('expires_at', '<', fields.Datetime.now()),
            ('is_revoked', '=', False)
        ])
        expired_tokens.write({'is_revoked': True})
        
        # Delete very old tokens (older than 60 days)
        old_date = datetime.now() - timedelta(days=60)
        old_tokens = self.search([('create_date', '<', old_date)])
        old_tokens.unlink()
        
        return True

    @api.model
    def revoke_user_tokens(self, user_id):
        """Revoke all tokens for a specific user"""
        tokens = self.search([
            ('user_id', '=', user_id),
            ('is_revoked', '=', False)
        ])
        tokens.write({'is_revoked': True})
        return True

    @api.model
    def is_token_valid(self, token, token_type='access'):
        """Check if a token is valid and not expired"""
        token_record = self.search([
            ('token', '=', token),
            ('token_type', '=', token_type),
            ('is_revoked', '=', False),
            ('expires_at', '>', fields.Datetime.now())
        ], limit=1)
        return token_record.id if token_record else False
