define([
  "backbone",
  "models/character",
  "views/AbilityScores"
],

function (Backbone, Character, AbilityScores) {
  var Workspace = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      App.addInitializer(function () {
        this.character = new Character();

        this.addRegions({
          abilityScores: '#ability-scores'
        });

        this.abilityScores.show( new AbilityScores({model: this.character}) );
      })
    }
  });

  return Workspace;
});

