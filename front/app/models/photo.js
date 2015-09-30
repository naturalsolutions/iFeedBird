define([
	'backbone'
], function(Backbone){

	'use strict';

	return Backbone.Model.extend({
		defaults: {
		    ID: null,
		    name: 'name',
		    title: null,
		    date: null,
	        path: null,
	        resized: null,
	        comment: null,
	        species: null
		},
		urlRoot : 'photos',
/*	    initialize: function(options){
    	}*/
	});
});
