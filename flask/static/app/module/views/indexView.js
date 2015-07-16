define([
    'jquery', 'marionette', 'text!../templates/views/indexView.html'
], function($, Marionette, indexViewTemplate) {

    /**
     * Left panel view in the homepage layout, contains form to filter grid on the center view
     */
    var IndexView = Backbone.Marionette.ItemView.extend({

        /**
         * Left panel view template
         */
        template : indexViewTemplate,

        /**
         * Event catch by the view
         */
        events : {
        },

        /**
         * View constructor, init grid channel
         */
        initialize : function(options) {
        },

        /**
         * View rendering callbak
         */
        onRender : function(options) {

        },

    });

    return IndexView;

});