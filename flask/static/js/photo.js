/*--- MODEL --------------------------------------------*/

window.Photo = Backbone.Model.extend({
	defaults:
    {
		Titre: 'Photo',
		Heure: 'Inconnue',
        Chemin: '/home/pi/iFeedBird/flask/static/photos/',
        Miniature: '/home/pi/iFeedBird/flask/static/photos/'
    },
    initialize: function(options){
    	console.log("initialize model photo");
    }
});


/*--- COLLECTION ---------------------------------------*/

window.Photos = Backbone.Collection.extend({
    model: window.Photo,
    url: '/photos',

    initialize: function(){
        console.log("initialize collection photos")
    }
});

/*--- VIEW ---------------------------------------------*/

//--------------------- View principale

window.ListImageView = Backbone.View.extend({
    tagName: 'ul',
    template: _.template($("#templateViewPrincipale").html()),
    initialize: function(options){
        console.log('initialize view principale');
        this.collection = options.collection;

        _.bindAll(this, 'createView');
        this.viewZ=[];
    },

    render: function(){
        console.log('render view principale');
        this.collection.fetch({
            success: this.createView
        });

        $(this.el).html(this.template());

        return this;
    },

    createView: function(){

        console.log('createView view principale');
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
    template: _.template($("#templateView").html()),

    initialize: function(options){
        console.log('initialize view photos');
    },

    events:
    {
        'click button': 'deletePhoto'
    },

    render: function(){
        console.log('render view photos');
        var htmlOutput = this.template(this.model.toJSON());
        this.$el.html(htmlOutput);
        console.log(this)
        return this;
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


//--------------------- Home

window.HomeView = Backbone.View.extend({

    //el: '#viewHome',
    template: _.template($("#templateViewHome").html()),

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
    template: _.template($("#templateInfoAppView").html()),

    initialize: function(options) {
        console.log('dans le initialize de la view info projet');
      },

    render: function() {

        var htmlOutput = this.template();
        this.$el.html(htmlOutput);
        return this;
    }
});

//--------------------- Contact

window.ContactView = Backbone.View.extend({

    template: _.template($("#templateContact").html()),

    initialize: function(options) {
        console.log('dans le initialize de la view contact');
      },

    render: function() {

        var htmlOutput = this.template();
        this.$el.html(htmlOutput);
        return this;
    }
});
