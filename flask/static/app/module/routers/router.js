define(['marionette'], function(Marionette) {

    var IFeedBirdRouter = Backbone.Marionette.AppRouter.extend({

        appRoutes: {
            "": "homeAction"
        }

    });

    return IFeedBirdRouter;

});