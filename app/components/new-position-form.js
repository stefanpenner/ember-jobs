import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',

  init() {
    this._super(...arguments);
    this.job     = {};
    this.company = {};
  },

  actions: {
    jobDidhange(job) {
      this.set('job', job);
    },

    companyDidChange(company) {
      this.set('company', company);
    },

    cancel() {
      this.sendAction('cancel');
    },

    save() {
      var store = this.store;
      var companyAttributes = this.get('company');
      var jobAttributes = this.get('job');
      var company = store.createRecord('company', companyAttributes);

      this.set('isSaving', true);

      company.save().then((company) => {
        jobAttributes.company = company;
        jobAttributes.live = true; // tmp

        return store.createRecord('job', jobAttributes).save();
      }).finally( () => this.set('isSaving', false) );
    }
  }
});
