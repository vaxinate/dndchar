define([
    "underscore",
    "backbone",
    "routers/router",
    "marionette"
],

function (_, Backbone, Workspace) {

    var App = new Backbone.Marionette.Application();

    // An init function for your main application object
    App.addInitializer(function () {
      this.root = '/';
      this.state = {}

      // set up the router
      new Workspace({app: App})
    });

    // Add as many of these as you like
    App.addInitializer(function () {
    });

    // Return the instantiated app (there should only be one)
    return App;

});
