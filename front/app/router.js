define(['jquery', 'marionette', 'backbone'],
	function($, Marionette, Backbone) {

'use strict';
	return Marionette.AppRouter.extend({
		appRoutes: {
			'gallery/upload(/)': 'upload',
			'gallery': 'gallery',
			'about': 'about',
			'contact': 'contact',
			'statistics': 'statistics',
			'details_photo': 'details_photo',
			'details(/:id)': 'details',
			'*route(/:page)': 'home',
		},

		onRoute: function (arg1, arg2){
			if (arg1 == 'home') {
				console.log('passed');
				$('body').addClass('home');
			} else {
				$('body').removeClass('home');
			}
		},
	});
});
