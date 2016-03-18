define(['marionette',
  'models/espece'],

function(Marionette, Espece) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: 'app/modules/species/tpl-species.html',
    className: 'full-height',

    initialize: function(options){
      this.model = options.model;
    },

    onShow: function(){

      this.render();
    },
  })
});
