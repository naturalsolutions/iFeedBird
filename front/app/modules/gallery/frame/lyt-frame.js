define(['jquery','marionette'],
  function($, Marionette) {
  'use strict';

  return Marionette.LayoutView.extend({
    el: '#my-element',
    template: 'app/modules/gallery/tpl-frame.html',
    //template: false,
    className: 'col-xs-3',

    ui: {
            paragraph: 'p',
            button: '.my-button'
    },
 
    events: {
        //'click @ui.button': 'clickedButton',
        'click #btnDelete': 'deletePhoto',
        'click #btnViewDetails' : 'viewDetails'
    },

    initialize: function(options){
        view.ui.button.trigger('click');
    },

    onShow: function(){
        console.log('onShow PreviewImageView');
        var htmlOutput = this.template(this.model.toJSON());
        this.$el.html(htmlOutput);
        return this;
    },

    viewDetails: function(e){
        var photo_id = $(e.target).data('id');
        this.rgMain.show(new LytDetails());
    },

    deletePhoto: function(e){
        var photo_id = $(e.target).data('id');

        $.ajax({
            type: 'DELETE',
            url: '/delete/' + photo_id,
            success: _.bind(function(){
                this.remove();
            }, this)
        })
    }

  });

});
