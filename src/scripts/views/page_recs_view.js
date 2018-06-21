var template = require('../templates/page_recs.html');

module.exports = Backbone.View.extend({
  template: template,

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function() {
    this.$el.html(this.template({
      recommendations: this.collection.collect(function (r) { return r.attributes; })
    }));

    return this;
  }
});
