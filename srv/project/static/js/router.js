/*--- Router ---------------------------------------*/
window.ImageRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'visionneuse': 'album',
        'info': 'info',
        'contact': 'contact',
        '*path': 'default'
    },

    route: function(route, name, callback) {
        var router = this;
        if (!callback) callback = this[name];

        var f = function() {
            callback.apply(router, arguments);
              if (window.location.hash != ''){
                  window.homeView.remove();
                  //$('#container2').append('<div id="viewHome"></div>')
              }
        };
        return Backbone.Router.prototype.route.call(this, route, name, f);
    },

    home: function(){
        if(window.listImageView != undefined) {
            window.listImageView.remove();
        }

        if(window.infoAppView != undefined) {
            window.infoAppView.remove();
        }

        if(window.contactView != undefined) {
            window.contactView.remove();
        }

        window.homeView = new HomeView({
        });

        // refaire la vue apres un changement de route
        $(homeView.render().el).appendTo('#viewHome');
    },

    album: function(){
      console.log('dans la route album');
      if(window.homeView != undefined) {
            window.homeView.remove();
        }

      if(window.infoAppView != undefined) {
          window.infoAppView.remove();
      }

      if(window.contactView != undefined) {
            window.contactView.remove();
        }

        window.photos = new Photos();

        window.listImageView = new ListImageView({
            collection: window.photos
        })

        // refaire la vue apres un changement de route
        $(listImageView.render().el).appendTo('#elViewPrincipale');
    },

    info: function(){
        if(window.listImageView != undefined) {
            window.listImageView.remove();
        }

        if(window.homeView != undefined) {
            window.homeView.remove();
        }

        if(window.contactView != undefined) {
            window.contactView.remove();
        }

        window.infoAppView = new InfoAppView({
        });

        // refaire la vue apres un changement de route
        $(infoAppView.render().el).appendTo('#elViewInfoApp');
    },

    contact: function(){
        if(window.listImageView != undefined) {
            window.listImageView.remove();
        }

        if(window.homeView != undefined) {
            window.homeView.remove();
        }

        if(window.infoAppView != undefined) {
            window.infoAppView.remove();
        }

        window.contactView = new ContactView({
        });

        // refaire la vue apres un changement de route
        $(contactView.render().el).appendTo('#elViewContact');
    },

    default: function(path) {
        window.alert('La route '+path+' n\'existe pas !');
        console.log('La route '+path+' n\'existe pas !');
    }
});
