// Widget nom per canviar el color
console.log('Creacio del widget nom');
odoo.define('cliweb.field_nom', function(require) {
    "use strict";
var FieldChar = require('web.basic_fields').FieldChar;
	/* web.basic_fields defineix la majoría dels fields
	 * no relacionals. Podem veure els que té vejent el final
	 * del fitxer /web/static/src/js/fields/basic_fields.js
	 * */
var  nom = FieldChar.extend({  // herència JS en Odoo
    //template: 'cliweb_template', en aquest cas no fa falta template
    _renderReadonly: function () {
        this._super.apply(this,arguments);
        // render en  mode sols lectura; _renderEdit
    },
    start: function() {
        var a = this._super.apply(this,arguments);
        this.$el.css('color','blue');   // $el és el contingut del DOM del widget
        return a
    },
    init: function() { //inizialització amb valors
        this._super.apply(this,arguments);
    },

    // En realitat no calia heretar readonly ni init, ja que no canviem res.
    // Però pot ser interessant no llevar-los per raons didàctiques.
});
	var fieldRegistry = require('web.field_registry');
	fieldRegistry.add('nom', nom); // Son cal fer widget="nom" en un field Char
	return nom;
});

// Widget reserva per mostrar de forma diferent el name de la reserva:
console.log('Creacio del widget reserva');

odoo.define('cliweb.field_reserva',function(require){
"use strict";
var AbstractField = require('web.AbstractField');

var reserva = AbstractField.extend({
    //template: 'cliweb_reserva_template',
    _renderReadonly: function () {
        this._super.apply(this,arguments);
        // render en  mode sols lectura; _renderEdit
    },
    start: function() {
        var a = this._super.apply(this,arguments);
        return a
    },
    init: function() { //inizialització amb valors
        this._super.apply(this,arguments);
    },
});

	var fieldRegistry = require('web.field_registry');
	fieldRegistry.add('reserva', reserva); // Son cal fer widget="nom" en un field Char
	return reserva;

});



// Widget cliweb_m2o per mostrar un many2one com si fora un kanban

console.log('Creacio del widget cliweb_m2o');

odoo.define('cliweb.field_m2o',function(require){  // Creació del mòdul, aquest és una funció que retorna la classe m2o
"use strict";

//// Anem a heretar del field many2one normal. Primer cal averiguar com es diu
/// El FieldMany2One està en /usr/lib/python3/dist-packages/odoo/addons/web/static/src/js/fields/relational_fields.js

var FieldMany2One = require('web.relational_fields').FieldMany2One;  // Gestió de les dependècies dels mòduls
// El que vol dir és que depen del mòdul web.relational_fields i en concret de la classe FieldMany2One d'aquest mòdul

var m2o = FieldMany2One.extend({    // Herència de Javascript per la qual la classe m2o es crea a partir de la FieldMany2One
   // Una classe és un diccionari javascript amb atributs i funcions.
    template: 'cliweb_m2o_template',
    _renderReadonly: function () {
        this._super.apply(this,arguments);
        // render en  mode sols lectura; _renderEdit
    },
    willStart: function() {

        console.log('willstart de m2o');
        var self = this;  // Com que anem a cridar a funcions, el this serà diferent dins i cal fer una variable independent.
        //console.log(this.value);
        var res = this._rpc({
		        model: this.value.model,   // El model demanat per el field
                method: 'read',        // Demana el mètode python read
                args: [this.value.res_id],   // En aquest cas, enviem com a arguments els ids demanats
                // no fiquem el nom dels fields demanats per que vull tots.
                context: this.record.getContext(),   // El context
                }).then(function (result) {
                console.log('RPC fet');
                 if (result.length === 0) {
                    console.log('no trobat');
                    }
		         self.record.dataLoaded = { elements: result, readonly: self.mode === "readonly"}; // El render espera aquest objecte
		        });
        return res;
    },
    start: function() {
        var a = this._super.apply(this,arguments);
        console.log('start de m2o');
       // console.log(this.$el);
       // console.log(this.m2o_value); // Aquesta variable la té el FieldMany2One, és sols el nom
        return a
    },
    init: function() { //inizialització amb valors
        this._super.apply(this,arguments);
         console.log('init de m2o');
    },

    /*
    Aquest és el _renderReadonly de FieldMany2One, el deixe comentat per entendre tot el que fa:

        _renderReadonly: function () {
        var value = _.escape((this.m2o_value || "").trim()).split("\n").join("<br/>"); // Utilitza el _. (llibreria underscore per fer un html correcte del value)
        this.$el.html(value);  // Aplica el value al html.
        if (!this.noOpen && this.value) {  // Creació de l'enllaç
            this.$el.attr('href', _.str.sprintf('#id=%s&model=%s', this.value.res_id, this.field.relation));
            this.$el.addClass('o_form_uri');
        }
    },
    */

    _renderReadonly: function () {
        var value = _.escape((this.m2o_value || "").trim()).split("\n").join("<br/>"); // Utilitza el _. (llibreria underscore per fer un html correcte del value)
        this.$div = this.$('div'); // Seleccionem el div on ficar els altres fields
        console.log('renderReadonly de m2o');
        this.$div.html(value);
        this.$div.append(this.record.dataLoaded.elements[0].id) // dataLoaded és un array amb tot el que descarrega en el willstart.
        console.log(this.record.dataLoaded);
        if (!this.noOpen && this.value) {  // Creació de l'enllaç
            this.$el.attr('href', _.str.sprintf('#id=%s&model=%s', this.value.res_id, this.field.relation));
            this.$el.addClass('o_form_uri');
        }
    },



});

	var fieldRegistry = require('web.field_registry');
	fieldRegistry.add('cliweb_m2o', m2o); // Son cal fer widget="cliweb_m2o" en un field Char
	return m2o;

});



