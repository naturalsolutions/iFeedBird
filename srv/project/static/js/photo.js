/*--- MODEL --------------------------------------------*/

window.Photo = Backbone.Model.extend({
	defaults:
    {
		Titre: 'Photo',
		Heure: 'Inconnue',
        Chemin: '/home/pi/iFeedBird/flask/static/photos/',
        Miniature: '/home/pi/iFeedBird/flask/static/photos/'
    },
    initialize: function(options)
    {
    	console.log("initialize model photo");
    }
});


/*--- COLLECTION ---------------------------------------*/

window.Photos = Backbone.Collection.extend({
    model: window.Photo,
    url: '/photos',

    initialize: function()
    {
        console.log("initialize collection photos")
    }
});

/*--- VIEW ---------------------------------------------*/

//--------------------- View principale

window.ListImageView = Backbone.View.extend({
    tagName: 'ul',
                                        // LA OU CA VA S'AFFICHER DANS LE HTML
    template: _.template($("#templateViewPrincipale").html()),      // LE TEMPLATE A CHARGER (decrit dans le html)
    initialize: function(options)
    {
        console.log('initialize view principale');
        this.collection = options.collection;
        //refresh la collection avec un changement
        //collection.on("change reset add remove", this.render, this);

        // Permet de spécifier le contexte de la méthode
        // Par défaut quand le fetch est terminé, createView est executé par la collection
        // Or on souhaite que ça soit la vue (fonction un peu plus bas)
        _.bindAll(this, 'createView');
        this.viewZ=[];
    },

    render: function()
    {
        console.log('render view principale');
        // fetch récupère la liste des photos en json via le serveur
        this.collection.fetch({
            // execute  createView quand  le fetch est terminé
            success: this.createView
        });

        $(this.el).html(this.template());

        return this;
    },

    createView: function()
    {

        console.log('createView view principale');
        // Pour chaque élément de la collection on créé une sous vue
        this.collection.each(_.bind(function(image){
            var previewImageView = new PreviewImageView({ model: image}).render();
            $(this.el).append(previewImageView.$el);
            this.viewZ.push(previewImageView);

        }, this))
    },

    deleteView: function(){
        console.log('deleteView view principale');
        _.each(this.viewZ, function(view){
            view.remove()
        })
        this.remove();
    }
});

//--------------------- View photo (une par fichier)

window.PreviewImageView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($("#templateView").html()),    // LE TEMPLATE A CHARGER (decrit dans le html)

    initialize: function(options)
    {
        console.log('initialize view photos');
        //this.render();
    },

    events:
    {
        'click button': 'deletePhoto'
    },

    render: function()
    {
        console.log('render view photos');
        var htmlOutput = this.template(this.model.toJSON());
        this.$el.html(htmlOutput);
        console.log(this)
        return this;
    },

    deletePhoto: function(e)
    {
        var photo_id = $(e.target).data('id');
        console.log('zef')
        
        $.ajax({
            type: 'DELETE',
            url: '/delete/' + photo_id,
            success: _.bind(function()
            {
                this.remove();
            }, this)
        })
    }
});


//--------------------- Home

window.HomeView = Backbone.View.extend({

    //el: '#viewHome',                                      // LA OU CA VA S'AFFICHER DANS LE HTML
    template: _.template($("#templateViewHome").html()),    // LE TEMPLATE A CHARGER (decrit dans le html)

    initialize: function(options) {
        console.log("test");
        //this.render();
      },

    render: function() {

        var htmlOutput = this.template();
        this.$el.html(htmlOutput);
        return this;
    }
});

//--------------------- Info web app

window.InfoAppView = Backbone.View.extend({

    //el: '#elViewInfoApp',                                      // LA OU CA VA S'AFFICHER DANS LE HTML
    template: _.template($("#templateInfoAppView").html()),    // LE TEMPLATE A CHARGER (decrit dans le html)

    initialize: function(options) {
        console.log('dans le initialize de la view info projet');
        //this.render();
      },

    render: function() {

        var htmlOutput = this.template();
        this.$el.html(htmlOutput);
        return this;
    }
});

//--------------------- Contact

window.ContactView = Backbone.View.extend({

    template: _.template($("#templateContact").html()),    // LE TEMPLATE A CHARGER (decrit dans le html)

    initialize: function(options) {
        console.log('dans le initialize de la view contact');
      },

    render: function() {

        var htmlOutput = this.template();
        this.$el.html(htmlOutput);
        return this;
    }
});
