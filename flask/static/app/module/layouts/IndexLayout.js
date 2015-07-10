define([
    'marionette',
    'text!module/templates/views/indexView.html',
    '../view/indexView'
], function(Marionette, IndexLayout, indexView) {

    var IndexLayout =  Backbone.Marionette.LayoutView.extend({

        /**
         * view events
         */
        events : {
            
        },

        initialize : function(options) {
        },

        template: IndexLayout,

        regions : {
            indexView   : '#indexView'
        },

        onRender : function() {
            //  Create and render item views
            this.indexView.show( new indexView({
            }) );
        },


    });

    return IndexLayout;

});