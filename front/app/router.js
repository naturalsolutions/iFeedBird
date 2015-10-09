define(['jquery', 'marionette', 'backbone'],
	function($, Marionette, Backbone) {

'use strict';
	return Marionette.AppRouter.extend({
		appRoutes: {
			'gallery': 'gallery',
			'about': 'about',
			'contact': 'contact',
			'statistics': 'statistics',
			'details_photo': 'details_photo',
			'details(/:id)': 'details',
			'*route(/:page)': 'home',
		},
	});
});
