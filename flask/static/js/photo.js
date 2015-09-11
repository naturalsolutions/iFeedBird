/*--- MODEL --------------------------------------------*/

window.Photo = Backbone.Model.extend({
	defaults:
    {
        ID: 'id',
		title: 'photo',
		date: 'date',
        path: '/home/pi/iFeedBird/flask/static/photos/',
        resized: '/home/pi/iFeedBird/flask/static/photos/',
        comment: 'comment',
        species: 'species'
    },

    initialize: function(options){
    	console.log("initialize model Photo");
    }
});

window.Espece = Backbone.Model.extend({
    defaults:
    {
        ID_espece: 'id',
        frequency: 'photo',
        name_fr: 'a determiner',
        name_en: 'a determiner',
        name_la: 'a determiner',
        authority: 'comment',
        wingspan: 'comment',
        weight: 'comment',
        length: 'comment',
        red_list_category: 'comment',
        distribution: 'comment',
        description: 'comment',
        photo1: 'comment',
        photo2: 'comment',
        photo3: 'comment',
        photo4: 'comment'
    },
    initialize: function(options){
        console.log("initialize model Photo");
    }
});


/*--- COLLECTION ---------------------------------------*/

window.Photos = Backbone.Collection.extend({
    model: window.Photo,
    url: '/photos',

    initialize: function(){
        console.log("initialize collection Photos")
    }
});

/*--- VIEW ---------------------------------------------*/

//--------------------- View principale

window.ListImageView = Backbone.View.extend({
    tagName: 'ul',
    template: _.template($("#templateViewPrincipale").html()),
    initialize: function(options){
        console.log('initialize ListImageView');
        this.collection = options.collection;

        _.bindAll(this, 'createView');
        this.viewZ=[];
    },

    render: function(){
        console.log('render ListImageView');
        this.collection.fetch({
            success: this.createView
        });

        $(this.el).html(this.template());

        return this;
    },

    createView: function(){

        console.log('createView ListImageView');
        this.collection.each(_.bind(function(image){
            var previewImageView = new PreviewImageView({ model: image}).render();
            $(this.el).append(previewImageView.$el);
            this.viewZ.push(previewImageView);

        }, this))
    },

    deleteView: function(){
        console.log('deleteView ListImageView');
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
        console.log('initialize PreviewImageView');
    },

    events:
    {
        'click #btn-delete': 'deletePhoto',
        'click #btn-ficheespece' : 'getFicheEspece',
        'click #btn-jpg' : 'getPhotoHD'
    },

    render: function(){
        console.log('render PreviewImageView');
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
    },

    getPhotoHD: function(e){
        var photo_id = $(e.target).data('id');

        $.ajax({
            type: 'GET',
            url: '/photohd/' + photo_id,
            success: _.bind(function(data){
                console.log(data);
            }, this)
        })
    },

    getFicheEspece: function(e){
        var espece_id = $(e.target).data('id');

        $.ajax({
            type: 'GET',
            url: '/ficheespece/' + espece_id,
            success: _.bind(function(data){
                console.log(data);
            }, this)
        })
    }
});


//--------------------- Home

window.HomeView = Backbone.View.extend({

    template: _.template($("#templateViewHome").html()),

    initialize: function(options) {
        console.log("initialize window.HomeView");
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
        console.log('initialize window.InfoAppView');
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
        console.log('initialize window.ContactView');
      },

    render: function() {

        var htmlOutput = this.template();
        this.$el.html(htmlOutput);
        return this;
    }
});
