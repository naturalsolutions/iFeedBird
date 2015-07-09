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

        $(homeView.render().el).appendTo('#viewHome');
    },

    album: function(){
      console.log('route album');
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

        $(contactView.render().el).appendTo('#elViewContact');
    },

    default: function(path) {
        window.alert('La route '+path+' n\'existe pas !');
    }
});
