define([
    'backbone',
    'models/klass',
    'text!templates/klass._'
  ],

  function(Backbone, Klass, template) {
    var KlassView = Backbone.View.extend({
      events: {
        'click [data-select-klass]': 'onSelectKlass'
      },

      template: _.template(template),

      initialize: function(options) {
        this.klasses = new Backbone.Collection([
          new Klass({name: 'Barbarian', hitDie: 12}),
          new Klass({name: 'Bard', hitDie: 6}),
          new Klass({name: 'Cleric', hitDie: 8}),
          new Klass({name: 'Druid', hitDie: 8}),
          new Klass({name: 'Fighter', hitDie: 10}),
          new Klass({name: 'Mage', hitDie: 6}),
          new Klass({name: 'Monk', hitDie: 8}),
          new Klass({name: 'Paladin', hitDie: 10}),
          new Klass({name: 'Ranger', hitDie: 10}),
          new Klass({name: 'Rogue', hitDie: 6})
        ]);
      },

      render: function() {
        this.$el.html(this.template(this.templateData()));
        return this;
      },

      templateData: function() {
        return {
          klasses: this.klasses,
          currentKlass: App.character.get('klass')
        };
      },

      onSelectKlass: function(e) {
        var klassName = this.$(e.currentTarget).data('select-klass');
        var klass = this.klasses.findWhere({name: klassName});

        App.vent.trigger('character:klass:change', { klass: klass });
      }
    });

    return KlassView;
  }
);
