define([
  'backbone',
  'text!templates/scoreSwap._'
],

function(Backbone, template) {
  var ScoreSwap = Backbone.View.extend({
    events: {
      'click [data-swap-to]': 'onClickSwap'
    },

    template: _.template(template),

    initialize: function(options) {
      this.scoreLabels = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
      this.swapFrom = this.$el.data('swap-from');
    },

    render: function() {
      this.$el.html(this.template(this.templateData()));
      return this;
    },

    templateData: function() {
      return {
        swapFrom: this.swapFrom,
        swapTo: _.without(this.scoreLabels, this.swapFrom)
      };
    },

    onClickSwap: function(e) {
      var swapTo = this.$(e.currentTarget).data('swap-to')
      App.vent.trigger('character:scores:swap', { from: this.swapFrom, to: swapTo });
    }
  });

  return ScoreSwap
});
