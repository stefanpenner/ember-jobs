import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    var isAdmin = this.get('sessionService.isAdmin');

    if (isAdmin) {
      return true;
    } else {
      this.transitionTo('index');
    }
  },

  model() {
    return this.store.all('job');
  }
});
