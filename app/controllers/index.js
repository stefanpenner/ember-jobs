import Ember from 'ember';
export default Ember.Controller.extend({
  queryParams: [
    'type',
    'search'
  ],

  actions: {
    jobTypeChanged(type) {
      this.set('type', type);
    },

    searchChanged(search) {
      this.set('search', search);
    }
  }
});
