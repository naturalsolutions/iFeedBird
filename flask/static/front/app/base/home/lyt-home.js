define(['marionette', 'i18n'],
function(Marionette) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: 'app/base/home/tpl/tpl-home.html',
		className: 'home-page ns-full-height',

		events: {
			'click #startCapture' : 'startCapture',
		},

		ui: {
			'startCapture' : '#startCapture'
		},


		initialize: function(options){
		},


		onShow : function(options) {
			this.$el.find('#tiles').i18n();
		},		


		startCapture: function(e){
			//TODO :start capture function
			if(this.ui.startCapture.hasClass('active')) {
				this.ui.startCapture.removeClass('active').html('Start Capture');
			}else{
				this.ui.startCapture.addClass('active').html('Stop Capture');
			}
		},
	});
});
