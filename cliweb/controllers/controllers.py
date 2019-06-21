# -*- coding: utf-8 -*-
from odoo import http

# class Cliweb(http.Controller):
#     @http.route('/cliweb/cliweb/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/cliweb/cliweb/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('cliweb.listing', {
#             'root': '/cliweb/cliweb',
#             'objects': http.request.env['cliweb.cliweb'].search([]),
#         })

#     @http.route('/cliweb/cliweb/objects/<model("cliweb.cliweb"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('cliweb.object', {
#             'object': obj
#         })