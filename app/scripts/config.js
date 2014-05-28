requirejs.config({
    deps: ['main'],
    paths: {
        text: '../bower_components/text/text',
        backbone: '../bower_components/backbone/backbone',
        jquery: '../bower_components/jquery/jquery',
        marionette: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        underscore: '../bower_components/lodash/lodash',
        'backbone.wreqr' : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.eventbinder' : '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
        'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        bootstrap: {
          deps: ["jquery"],
          exports: "$.fn.popover"
        }
    }
});
