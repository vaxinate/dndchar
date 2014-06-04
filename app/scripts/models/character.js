define([
  "underscore",
  "models/klass",
  "backbone",
  "backbone.compute"
],

function (_, Klass, Backbone) {
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
    var distance = score - 10;
    return Math.floor(distance / 2);
  }

  var Character = Backbone.Model.extend({
    defaults: {
      'level': 1,
      'str': 8,
      'dex': 8,
      'con': 8,
      'int': 8,
      'wis': 8,
      'cha': 8,
      'klass': new Klass()
    },

    initialize: function(options) {
      Backbone.Compute(this);
      // bubble up events to the app vent
      this.on('all', function(eventName, object) {
        App.vent.trigger("character:" + eventName, object);
      });
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

    initiative: {
      fields: ['dexMod'],
      compute: function() { return this.get('dexMod') }
    },

    unarmoredAC: {
      fields: ['dexMod'],
      compute: function() { return (10 + this.get('dexMod')) }
    },

    maxHP: {
      fields: ['klass', 'conMod'],
      compute: function() { return this.get('klass').levelOneHP(this.get('conMod')) } // TODO higher levels
    },

    hitDie: {
      fields: ['level', 'klass'],
      compute: function() { return this.get('level') + 'd' + this.get('klass').get('hitDie') }
    },

    randomizeScores: function() {
      this.resetScores(_.times(6, function(n) { return rollScore(); }));
    },

    applyDefaultScores: function() {
      this.resetScores([16, 14, 13, 12, 10, 8]);
    },

    resetScores: function(scores) {
      var score_keys = ['str', 'con', 'int', 'wis', 'cha', 'dex'];
      this.set( _.object(score_keys, scores) )
    },

    swapScores: function(from, to) {
      var options = {}
      options[from] = this.get(to);
      options[to] = this.get(from);
      this.set(options);
    },

    registerEventHandlers: function() {
      var _this = this;
      _.each(arguments, function(eventName) {
        _this.registerEventHandler(eventName);
      });
    },

    registerEventHandler: function(eventName) {
      var handler = this.eventHandlers[eventName];

      if (handler !== undefined) {
        this.listenTo(App.vent, eventName, handler);
      } else {
        throw 'no handler for ' + eventName;
      }
    },

    eventHandlers: {
      'character:scores:swap': function(event) {
        this.swapScores(event.to, event.from);
      },
      'character:klass:change': function(event) {
        this.set({klass: event.klass});
      }
    }
  });

  return Character;
})
