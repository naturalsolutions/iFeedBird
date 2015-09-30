define([
	'backbone',
	'models/photo',
  'config'
], function(Backbone, Photo, config){
	
	'use strict';
	
	return Backbone.Collection.extend({
		model: Photo,
    	url: config.proxy + 'photos'
	});
});