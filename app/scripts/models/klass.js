define([
  "underscore",
  "backbone",
  "backbone.compute"
],

function (_, Backbone) {
  var Klass = Backbone.Model.extend({
    defaults: {
      'name': 'No Class',
      'hitDie': 0
    },

    levelOneHP: function(conMod) {
      return _.max([this.get('hitDie') + conMod, 1]);
    }
  });

  return Klass;
});
