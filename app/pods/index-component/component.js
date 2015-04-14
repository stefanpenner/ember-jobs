import Ember from 'ember';
import computed, { readOnly } from 'ember-computed-decorators';

const { inject } = Ember;

export default Ember.Component.extend({
  sessionService: inject.service('session'),

  types: [
    'Full Time',
    'Part Time'
  ],


  @computed('type', 'search', 'model.@each.{title,description,type,location,company,name}')
  @readOnly
  jobsByType(type, search) {
    var model = this.get('model');
    var result = model;

    if (type && !Ember.isBlank(type) && type !== "undefined") {
      result = model.filterBy('type', type);
    }

    return result;
    return this._filter(result).filterBy('live');
  },

  @computed('jobsByType.[]')
  filteredJobs(jobs) {
    var query = this.get('search');
    var queryRegExp = new RegExp(query, 'i');
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
  },

  actions: {
    jobTypeChanged(type) {
      this.sendAction('jobTypeChanged', type);
    },

    searchChanged(search) {
      this.sendAction('searchChanged', search);
    }
  },
});
