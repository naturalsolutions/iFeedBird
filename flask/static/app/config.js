/**
 * @fileOverview config.js
 *
 * RequireJS configuration file
 *
 * @author          MICELI Antoine (miceli.antoine@gmail.com)
 * @version         1.0
 */

require.config({

    paths: {
        backbone                            : "../libs/vendors/backbone/backbone",
        bootstrap                           : "../libs/vendors/bootstrap/dist/js/bootstrap.min",
        jquery                              : "../libs/vendors/jquery/dist/jquery.min",
        underscore                          : "../libs/vendors/underscore/underscore-min",
        requirejs                           : "../libs/vendors/requirejs/require",
        marionette                          : '../libs/vendors/marionette/lib/backbone.marionette.min',
        text                                : "../libs/vendors/text/text"
    },

    shim: {
        jquery: {
            exports: "$"
        },
        underscore: {
            exports: "_"
        },
        backbone: {
            exports: "Backbone",
            deps: [
                "underscore",
                "jquery"
            ]
        },
        bootstrap: {
            exports: "$",
            deps: [
                "jquery"
            ]
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        }
    }
});

require(['ifeedbird'], function(ifeedbird) {
    console.log('start')
    ifeedbird.start();
});