import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    buttonClicked() {
      this.sendAction('postJob');
    }
  }
});
