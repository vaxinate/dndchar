define([
  "underscore",
  "backbone",
  "backbone.compute"
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
  };

  var calcMod = function(score) {
    distance = score - 10;
    return Math.floor(distance / 2);
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
      Backbone.Compute(this);
      // bubble up events to the app vent
      this.on('all', function(eventName, object) {
        App.vent.trigger("character:" + eventName, object);
      });

      this.listenTo(App.vent, 'character:swapScores', this.onScoreSwap);
    },

    strMod: {
      fields: ['str'],
      compute: function() { return calcMod(this.get('str')) }
    },

    conMod: {
      fields: ['con'],
      compute: function() { return calcMod(this.get('con')) }
    },
    dexMod: {
      fields: ['dex'],
      compute: function() { return calcMod(this.get('dex')) }
    },
    intMod: {
      fields: ['int'],
      compute: function() { return calcMod(this.get('int')) }
    },
    wisMod: {
      fields: ['wis'],
      compute: function() { return calcMod(this.get('wis')) }
    },
    chaMod: {
      fields: ['cha'],
      compute: function() { return calcMod(this.get('cha')) }
    },

    randomizeScores: function() {
      var score_keys = ['str', 'con', 'int', 'wis', 'cha', 'dex']
      var scores = _.map(score_keys, function (key) { return rollScore() });

      this.set( _.object(score_keys, scores) )
    },

    swap: function(from, to) {
      var options = {}
      options[from] = this.get(to);
      options[to] = this.get(from);
      this.set(options);
    },

    onScoreSwap: function(scoreLabelPair) {
      this.swap(scoreLabelPair[0], scoreLabelPair[1])
    }
  });

  return Character;
})
