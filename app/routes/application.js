import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    postJob() {
      window.alert('post');
    }
  }
});
