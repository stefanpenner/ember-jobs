import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('job');
  },
  afterModel: function() {
    return this.store.find('company');
  }
});
