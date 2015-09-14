define(['marionette',
  'models/espece'],

function(Marionette, Espece) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: 'app/modules/species/tpl-species.html',
    className: 'full-height',

    initialize: function(options){
 /*     this.model = new Espece();
      this.model.url = '/photos/'+this.id+'/species';
      
      this.model.fetch();
      console.log(this.model);*/
      this.model = options.model;
    },

    onShow: function(){
      this.render();
    },
  })
});
