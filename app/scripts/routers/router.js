define([
  "backbone",
  "models/character"
],

function (Backbone, Character) {
  var Workspace = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      character = new Character();
      console.log(character)
    }
  });

  return Workspace;
});

