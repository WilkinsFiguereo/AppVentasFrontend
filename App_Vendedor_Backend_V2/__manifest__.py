{
    'name': 'App Vendedor',
    'version': '19.0.1.0.0',
    'category': 'API',
    'summary': '',
    'description': """
        REST API with JWT Authentication
        - User registration (partners)
        - User login (partners & delivery)
        - Token refresh
        - Profile management
    """,
    'author': 'Your Company',
    'depends': ['base', 'web'],
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'data/config_data.xml',
        'view/res_users_views.xml',
    ],
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
