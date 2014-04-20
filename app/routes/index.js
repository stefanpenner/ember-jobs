export default Ember.Route.extend({
  model: function() {
    return this.store.find('job');
  },
  afterModel: function(jobs, transition) {
    return this.store.find('company');
  }
});
