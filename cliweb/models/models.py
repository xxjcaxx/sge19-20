# -*- coding: utf-8 -*-

from odoo import models, fields, api


class hotel(models.Model):
    _name = 'cliweb.hotel'
    _description = "Els hotels"
    name = fields.Char()
    photo = fields.Binary()
    gallery = fields.One2many('cliweb.gallery','hotel')


class gallery(models.Model):
    _name = 'cliweb.gallery'
    _description = "Els La galeria"
    name = fields.Char()
    hotel = fields.Many2one('cliweb.hotel')
    photo = fields.Binary()

class reserva(models.Model):
    _name = 'cliweb.reserva'
    _description = "Les reserves"
    name = fields.Char(compute='_set_name')
    hotel = fields.Many2one('cliweb.hotel')
    check_in = fields.Datetime()
    check_out = fields.Datetime()


    @api.depends('hotel','check_in','check_out')
    def _set_name(self):
        for r in self:
            # El nom ha de ser un JSON amb el id i les dos dates. Exemple:
            # [{"hotel":1, "check_in": "2019-08-21 12:53:32", "check_out": "2019-08-23 12:53:32"}]
           r.name = "[{\"hotel\":"+str(r.hotel.id)+", \"check_in\": \""+str(r.check_in)+"\", \"check_out\": \""+str(r.check_out)+"\"}]"

# El nom és un json no adequat per veue als many2one i demés. Cal sobreescriurer el name_get
    @api.multi
    def name_get(self):
     result = []
     for record in self:
        record_name = str(record.hotel.name) + ' - ' + str(record.check_in)
        result.append((record.id, record_name))
     return result
