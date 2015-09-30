define([
	'backbone',
	'models/photo'
], function(Backbone, Photo){
	
	'use strict';
	
	return Backbone.Collection.extend({
		model: Photo,
    	url: '/photos'
	});
});