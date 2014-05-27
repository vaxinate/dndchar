define([
  "underscore",
  "backbone"
],

function (_, Backbone) {
  var roll = function(numSides) {
    return 1 + Math.floor(Math.random() * numSides);
  };

  var rollScore = function() {
    var rolls = []
    // roll 4d6
    for (var k = 0; k < 4; k++) {
      rolls.push(roll(6));
    }

    // sort the roles, ditch the lowest one, sum remaining rolls
    rolls.sort().reverse().pop()
    return _.reduce(rolls, function(memo, num){ return memo + num; }, 0);
  }

  var Character = Backbone.Model.extend({
    defaults: {
      'str': 0,
      'dex': 0,
      'con': 0,
      'int': 0,
      'wis': 0,
      'cha': 0
    },

    initialize: function(options) {
      // bubble up events to the app vent
      this.on('all', function(eventName, object) {
        App.vent.trigger("character:" + eventName, object);
      });
    },

    randomizeScores: function() {
      var score_keys = ['str', 'con', 'int', 'wis', 'cha', 'dex']
      var scores = _.map(score_keys, function (key) { return rollScore() });

      this.set( _.object(score_keys, scores) )
    }
  });

  return Character;
})
