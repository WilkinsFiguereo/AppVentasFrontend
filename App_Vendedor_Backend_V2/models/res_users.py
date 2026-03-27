# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.exceptions import ValidationError
import re


class ResUsers(models.Model):
    _inherit = 'res.users'

    #roles
    app_role = fields.Selection([
        ('partner', 'Partner'),
        ('delivery', 'Delivery')
    ], 
    string='App Role', help='Role in the mobile application')
    
    first_name = fields.Char(string='First Name')
    last_name = fields.Char(string='Last Name')
    profile_image = fields.Binary(string='Profile Image', attachment=True)
    
    @api.model
    def create_partner_user(self, vals):
        """Create a new partner user from registration"""
        # Validate email format
        if 'login' in vals:
            email = vals['login']
            if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
                raise ValidationError('Invalid email format')
        
        # Check if email already exists
        existing_user = self.search([('login', '=', vals.get('login'))], limit=1)
        if existing_user:
            raise ValidationError('A user with this email already exists')
        
        # Set default values for partner user
        partner_group = self.env.ref('odoo_auth_jwt.group_app_partner')
        
        vals.update({
            'app_role': 'partner',
            'groups_id': [(6, 0, [partner_group.id])],
            'active': True,
        })
        
        # Create partner name from first and last name
        if 'first_name' in vals and 'last_name' in vals:
            vals['name'] = f"{vals['first_name']} {vals['last_name']}"
        
        # Password validation
        if 'password' in vals:
            password = vals['password']
            if len(password) < 8:
                raise ValidationError('Password must be at least 8 characters long')
            if not re.search(r'[A-Z]', password):
                raise ValidationError('Password must contain at least one uppercase letter')
            if not re.search(r'[a-z]', password):
                raise ValidationError('Password must contain at least one lowercase letter')
            if not re.search(r'\d', password):
                raise ValidationError('Password must contain at least one number')
        
        # Create the user
        user = self.sudo().create(vals)
        
        return user
    
    def get_user_role(self):
        """Get the app role of the current user"""
        self.ensure_one()
        return self.app_role or False
    
    def update_profile_image(self, image_base64):
        """Update user profile image"""
        self.ensure_one()
        self.write({'profile_image': image_base64})
        return True
    
    @api.model
    def get_user_info(self, user_id):
        """Get user information for API response"""
        user = self.browse(user_id)
        if not user.exists():
            return False
        
        return {
            'id': user.id,
            'name': user.name,
            'first_name': user.first_name or '',
            'last_name': user.last_name or '',
            'email': user.login,
            'role': user.app_role or '',
            'profile_image': user.profile_image or False,
        }
