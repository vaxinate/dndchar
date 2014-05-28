define([
  'backbone',
  'marionette',
  'views/ScoreSwap',
  'text!templates/AbilityScores._'
],

function (Backbone, Marionette, ScoreSwap, template) {
  return Backbone.Marionette.ItemView.extend({
    template: _.template(template),
    events: {
      'click .js-randomize': 'onClickRandomize',
      'click .js-template': 'onClickTemplate'
    },

    initialize: function(options) {
      this.listenTo(this.model, 'change', this.render);
      this.on('item:rendered', this.afterRender);
    },

    onClickRandomize: function(e) {
      this.model.randomizeScores();
    },

    onClickTemplate: function(e) {
      this.model.applyDefaultScores();
    },

    afterRender: function() {
      this.$('[data-swap-from]').each(function(i, el) {
        var swapper = new ScoreSwap({el: el});
        swapper.render();
      });
    }
  });
});
