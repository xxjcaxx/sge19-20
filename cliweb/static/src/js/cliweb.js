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



