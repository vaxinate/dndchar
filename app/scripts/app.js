define([
    "underscore",
    "backbone",
    "routers/router",
    "marionette"
],

function (_, Backbone, Workspace) {

    // we need this guy to be in the global namespace
    window.App = new Backbone.Marionette.Application();

    // An init function for your main application object
    App.addInitializer(function () {
      this.root = '/';

      // set up the router
      new Workspace()
    });

    // Add as many of these as you like
    App.addInitializer(function () {
    });

    // Return the instantiated app (there should only be one)
    return App;

});
