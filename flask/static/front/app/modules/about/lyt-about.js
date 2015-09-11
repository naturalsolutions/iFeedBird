define(['marionette'],
function(Marionette, LytAbout) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: 'app/modules/about/tpl-about.html',
    className: 'full-height',

    initialize: function(options){
      console.log('init layout about');
    },

    onShow: function(){
    },
  });
});
