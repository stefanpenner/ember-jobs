import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    postJob: function() {
      window.alert('post');
    }
  }
});
