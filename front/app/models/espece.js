define([
	'backbone'
], function(Backbone){

	'use strict';

	return Backbone.Model.extend({
		defaults: {
	        ID_espece: null,
	        frequency: null,
	        name_fr: null,
	        name_en: 'name',
	        name_la: null,
	        authority: null,
	        wingspan: null,
	        weight: null,
	        length: null,
	        red_list_category: null,
	        distribution: null,
	        description: null
	        //photos:null
		},
		
		
		initialize: function(options){
			this.url ='/photos/'+this.id+'/species';
    	}
	});
});
