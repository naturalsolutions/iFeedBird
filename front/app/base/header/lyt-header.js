/**

	TODO:
	- header class hide : see router.js & app.js

**/


define(['marionette'],
function(Marionette) {
	'use strict';
	return Marionette.LayoutView.extend({
		template: 'app/base/header/tpl-header.html',
		className: 'header',


		initialize: function(){
		},


		onShow: function(){
			
		},
	});
});
