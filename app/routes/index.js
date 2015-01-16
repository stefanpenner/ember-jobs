import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('job');
  },

  afterModel() {
    return this.store.find('company');
  }
});
