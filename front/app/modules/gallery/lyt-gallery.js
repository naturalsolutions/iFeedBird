define(['marionette', 'collections/photos', './frame/lyt-frame'],
  function(Marionette, Photos, LytFrame) {
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

        var StoryCollectionView = Backbone.Marionette.CollectionView.extend({
            childView: LytFrame,
            className: 'collView',
        });

        var storyCollView = new StoryCollectionView({
          collection: this.collection
        });

        storyCollView.render();

        this.ui.photoList.html(storyCollView.el);
    },
  });
});
