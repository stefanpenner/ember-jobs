import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    typeChanged(type) {
      this.sendAction('jobTypeChanged', type);
    }
  }
});
