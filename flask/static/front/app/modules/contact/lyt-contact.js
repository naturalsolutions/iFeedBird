define(['marionette'],
function(Marionette, LytContact) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: 'app/modules/contact/tpl-contact.html',
    className: 'full-height',
    
    initialize: function(options){
      console.log('init lyt contact');
    },

    onShow: function(){
    },
  });
});
