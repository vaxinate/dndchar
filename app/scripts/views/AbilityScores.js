define([
  'backbone',
  'marionette',
  'text!templates/AbilityScores._'
],

function (Backbone, Marionette, template) {
  return Backbone.Marionette.ItemView.extend({
    template: _.template(template),
    events: {
      'click .js-randomize': 'onClickRandomize'
    },

    initialize: function(options) {
      this.listenTo(this.model, 'change', this.render);
    },

    onClickRandomize: function(e) {
      this.model.randomizeScores();
    }
  });
});
