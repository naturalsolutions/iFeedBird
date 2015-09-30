require.config({ 
	baseUrl: './app',
	paths : {

		'app'					: 'app',
		'config'				: 'config',
		'router'				: 'router',
		'controller'			: 'controller',
		'models'				: './models',
		'collections'			: './collections',
		'templates'				: '../build/templates',
		'lyt-rootview'			: './base/rootview/lyt-rootview',
		'transition-region'		: './base/transition-region/transition-region',
		'translater'            : 'translater', 
		


		/*==========  Bower  ==========*/
		'jquery'				: '../bower_components/jquery/jquery.min',
		'jqueryui'				: '../bower_components/jqueryui/jquery-ui.min',
		'underscore'			: '../bower_components/underscore/underscore',
		'backbone'				: '../bower_components/backbone/backbone',
		'marionette'			: '../bower_components/marionette/lib/core/backbone.marionette',
		'backbone.babysitter'	: '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		'backbone.wreqr'		: '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'radio'					: '../bower_components/backbone.radio/build/backbone.radio',
		'bootstrap'				: '../bower_components/bootstrap/dist/js/bootstrap',
		'sha1'					: '../bower_components/sha1/bin/sha1',

		
		'i18n'					: '../bower_components/i18n/i18next',
		
	},


	shim : {
		jquery : {
			exports : '$'
		},
		jqueryui: {
			exports: 'ui'
		},
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : ['jquery', 'underscore'],
			exports : 'Backbone'
		},
		marionette : {
			exports : 'Marionette'
		},
		radio : {
			exports : 'Radio'
		},
		bootstrap: {
			deps: ['jquery'],
			exports : 'Bootstrap'
		},
		templates :{
			deps : ['underscore'],
			exports : 'Templates',
		},
		sha1: {
			exports: 'sha1'
		},

		i18n : {
			deps: ['jquery'],
			exports : '$'
		},
	},
});

require(['app', 'templates','translater'], function(app,templates,Translater){
		app.start();
		this.translater = Translater.getTranslater();
});
