define(['marionette',
  'models/photo'],

function(Marionette, Photo) {
  'use strict';

  return Marionette.ItemView.extend({
    template: 'app/modules/details/tpl-details.html',
    className: 'full-height',
    events:{
      'click #btn-save': 'savePhoto',
    },
    initialize: function(options){
      this.model = options.model;
    },

    onShow: function(){
    },

    savePhoto: function(){
      this.model.comment = 'toto';//this.$el.find('#comment').value();

      this.model.save();
    }

  })
});
