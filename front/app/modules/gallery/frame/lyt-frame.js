define(['jquery','marionette','config'],
  function($, Marionette, config) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: 'app/modules/gallery/frame/tpl-frame.html',
    className: 'col-xs-3 no-padding frame',

    events: {
        'click #btnDelete': 'deletePhoto',
        'click #btnViewDetails' : 'viewDetails',
        'click #fileToUpload' : 'upLoad',
    },

    initialize: function(options){
    },

    onShow: function(){
        console.log('onShow PreviewImageView');
        var htmlOutput = this.template(this.model.toJSON());
        this.$el.html(htmlOutput);
        return this;
    },

    viewDetails: function(e){
        //this.rgMain.show(new LytDetails());
    },

    deletePhoto: function(e){
        var photo_id = $(e.target).data('id');

        this.model.urlRoot =  config.proxy +'/photos';
        this.model.idAttribute = 'ID';
        var _this = this;
        this.model.destroy();
        
    },


  });

});
