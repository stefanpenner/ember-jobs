import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  actions: {
    delete(job) {
      if (confirm('Are your sure?')) {
        job.destroyRecord();
      }
    },

    toggleLive(job) {
      if (confirm('Are your sure?')) {
        job.toggleProperty('live');
        job.save();
      }
    }
  }
});
