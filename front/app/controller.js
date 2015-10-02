define(['marionette', 
	'./base/home/lyt-home',
	'./modules/gallery/lyt-gallery',
	'./modules/about/lyt-about',
	'./modules/contact/lyt-contact',
	'./modules/focus/lyt-focus'],

	function( Marionette, LytHome, LytGallery, LytAbout, LytContact, LytFocus){
	'use strict';
	return Marionette.Object.extend({

		initialize: function(){
			this.rgMain=window.app.rootView.rgMain;
			this.rgHeader=window.app.rootView.rgHeader;
			this.rgFooter=window.app.rootView.rgFooter;
		},

		home: function() {
			Backbone.history.navigate('');
			this.rgMain.show(new LytHome());
		},

		gallery: function(){
			this.rgMain.show(new LytGallery());
		},

		about: function(){
			this.rgMain.show(new LytAbout());
		},

		contact: function(){
			this.rgMain.show(new LytContact());
		},

		details_photo: function(id_){
		},

		details: function(id_){
			this.rgMain.show(new LytFocus({id : id_ }));
		}
	});
});

