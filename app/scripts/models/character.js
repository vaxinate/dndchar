define([
  "underscore",
  "backbone"
],

function (_, Backbone) {
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

  return Character;
})
