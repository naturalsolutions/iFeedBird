/**

	TODO:
	- set login as marionette.application

**/
define(['jquery', 'marionette', 'backbone'],
	function($, Marionette, Backbone) {

'use strict';
	return Marionette.AppRouter.extend({
		appRoutes: {
			'gallery': 'gallery',
			'about': 'about',
			'contact': 'contact',
			'details(/:id)': 'details',
			'*route(/:page)': 'home',
			'details_photo': 'details_photo'
		},
	});
});
