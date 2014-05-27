define([
  "backbone"
],

function (Backbone) {
  return Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    initialize: function(options) {
      this.App = options.app
    },

    index: function() {
      console.log(this.App)
    }
  });
});

