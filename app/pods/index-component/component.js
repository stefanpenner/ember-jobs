import Ember from 'ember';

var computed = Ember.computed;
var inject = Ember.inject;

export default Ember.Component.extend({
  sessionService: inject.service('session'),
  isAdmin: computed.readOnly('sessionService.isAdmin'),

  types: [
    'Full Time',
    'Part Time'
  ],

  jobsByType: computed('type',
                       'search',
                       'model.@each.{title,description,type,location,company,name}', function() {
    var type = this.get('type');
    var model = this.get('model');
    var result = model;

    if (type && !Ember.isBlank(type) && type !== "undefined") {
      result = model.filterBy('type', type);
    }

    return result;
    return this._filter(result).filterBy('live');
  }).readOnly(),

  filteredJobs: computed('jobsByType.[]', function() {
    var query = this.get('search');
    var queryRegExp = new RegExp(query, 'i');
    var jobs = this.get('jobsByType');
    var result;

    if (Ember.isBlank(query)) {
      result = jobs.toArray();
    } else {
      result = jobs.filter((job) => {
        return !query ||
          queryRegExp.test(job.get('title')) ||
          queryRegExp.test(job.get('description')) ||
          queryRegExp.test(job.get('type')) ||
          queryRegExp.test(job.get('company.name')) ||
          queryRegExp.test(job.get('location'));
      });
    }

    return result;
  }).readOnly(),

  actions: {
    jobTypeChanged(type) {
      this.sendAction('jobTypeChanged', type);
    },

    searchChanged(search) {
      this.sendAction('searchChanged', search);
    }
  },
});
