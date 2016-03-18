define(['marionette', 
  'modules/details/lyt-details',
  'modules/species/lyt-species',
  'models/photo',
  'models/espece'],

function(Marionette, LytDetails, LytSpecies, Photo, Espece) {
  'use strict';

  return Marionette.LayoutView.extend({
    template: 'app/modules/focus/tpl-focus.html',
    className: 'full-height photo-detail',
    regions: {
        detailsRegion: "#details",
        speciesRegion: "#species"
    },

    initialize: function(options){
      //console.log(this.id);
    },

    onShow: function(){
      var _this = this;
      var photo = new Photo({id : this.id});
      var species = new Espece({id : this.id});

      photo.fetch({
        success: function(){
          _this.detailsRegion.show(new LytDetails({model : photo}));
        }
      });

      species.fetch({
        success: function(){
          _this.speciesRegion.show(new LytSpecies({model : species}));
        }
      });
    },
  })   
});
