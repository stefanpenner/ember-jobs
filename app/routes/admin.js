import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    var isAdmin = this.controllerFor('session').get('isAdmin');

    if (isAdmin) {
      return true;
    } else {
      this.transitionTo('index');
    }
  },
  model: function() {
    return this.store.find('job');
  }
});
