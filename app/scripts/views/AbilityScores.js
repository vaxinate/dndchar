define([
    'backbone',
    'marionette',
    'text!templates/AbilityScores._'
],

function (Backbone, Marionette, template) {
    return Backbone.Marionette.ItemView.extend({
        template: _.template(template),
        events: {}
    });
});
