import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    searchChanged(changed) {
      this.sendAction('searchChanged', this.get('search'));
    },

    typeChanged(type) {
      this.sendAction('jobTypeChanged', type);
    }
  }
});
