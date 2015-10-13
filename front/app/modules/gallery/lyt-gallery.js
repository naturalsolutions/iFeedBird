define(['marionette', 'collections/photos'],
  function(Marionette, Photos) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: 'app/modules/gallery/tpl-gallery.html',
    className: 'full-height gallery',

    ui: {
      'photoList': '#photoList'
    },
    
    initialize: function(options){
      this.collection = new Photos ();
    },

    onShow: function(){
      var _this = this;

      this.collection.fetch({
          success: function(){
            _this.initCollView();
          },
      });
    },

    initCollView: function(){
      var _this = this;

        var frameView = Backbone.Marionette.ItemView.extend({
            tagName: 'li',
            template: 'app/modules/gallery/frame/tpl-frame.html',
            className: 'col-md-3'
        });

        var StoryCollectionView = Backbone.Marionette.CollectionView.extend({
            childView: frameView,
            tagName: 'ul'
        });

        var storyCollView = new StoryCollectionView({
          collection: this.collection
        });

        storyCollView.render();

        this.ui.photoList.html(storyCollView.el);
    },
  });
});
