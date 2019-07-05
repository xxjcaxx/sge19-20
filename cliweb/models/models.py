# -*- coding: utf-8 -*-

from odoo import models, fields, api


class hotel(models.Model):
    _name = 'cliweb.hotel'
    _description = "Els hotels"
    name = fields.Char()
    gallery = fields.One2many('cliweb.gallery','hotel')


class gallery(models.Model):
    _name = 'cliweb.gallery'
    _description = "Els hotels"
    name = fields.Char()
    hotel = fields.Many2one('cliweb.hotel')
    photo = fields.Binary()

