/* global alert */
export default Ember.Route.extend({
  actions: {
    postJob: function() {
      alert('post');
    }
  }
});
