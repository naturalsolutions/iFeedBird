/**
 * Run the application
 * At start we run HomePageRouter to display homepage
 */

define(['backbone', 'marionette', 'module/routers/router', 'module/controllers/controller'
    //dependences dont on a besoin

], function(Backbone, Marionette, Router, Controller) {
    // les initializers s'executent dans l'ordre

    //  Create a marionette application
    var IFeedBirdApp = new Backbone.Marionette.Application();

    //  Add main region for the layouts
    IFeedBirdApp.addRegions({
        mainRegion  : '#main_region'
    });

    IFeedBirdApp.addInitializer(function(options){
        window.location.hash = "#";
    });

    //  Add a first initializer that create homepage router
    IFeedBirdApp.addInitializer(function(options){
        //  Create controller for homepage
        var homePageRouter = new Router({
            controller : new Controller({
                mainRegion : this.mainRegion
            })
        });
    });

    //  Application start callback
    IFeedBirdApp.on('start', function(options) {
        Backbone.history.start();
    })

    return IFeedBirdApp;
});