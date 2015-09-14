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
     /* this.model = new Photo({id : this.id});
      this.model.fetch();*/
      /*this.model.url = '/photos/'+this.id;
      this.model.fetch();*/

      this.model = options.model;
    },

    onShow: function(){
      this.render();
    },

    savePhoto: function(){
      this.model.comment = 'toto';//this.$el.find('#comment').value();

      this.model.save();
    }

  })
});
