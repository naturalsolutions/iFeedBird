define([
	'backbone',
	'config'
], function(Backbone, config){


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

		initialize: function(options){

			if( options.id ) {
				this.url = config.proxy + '/photos/'+this.id+'';
    	}

    }
	});
});
