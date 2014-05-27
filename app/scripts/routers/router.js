define([
  "backbone"
],

function (Backbone) {
  return Backbone.Router.extend({
  var Workspace = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      console.log(this.App)
    }
  });
  return Workspace;
});

