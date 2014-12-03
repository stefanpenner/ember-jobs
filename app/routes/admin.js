import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    var isAdmin = this.controllerFor('session').get('isAdmin');

    if (isAdmin) {
      return true;
    } else {
      this.transitionTo('index');
    }
  },

  model() {
    return this.store.find('job');
  }
});
