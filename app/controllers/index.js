import Ember from 'ember';

var computed = Ember.computed;
var inject = Ember.inject;

export default Ember.Controller.extend({
  sessionService: inject.service('session'),
  isAdmin: computed.readOnly('sessionService.isAdmin'),

  queryParams: [
    'type',
    'search'
  ],

  types: [
    'Full Time',
    'Part Time'
  ],

  init() {
    this._super(...arguments);

    this.set('filtered', []);
    this.search = null;
  },

  jobsByType: computed('type', function() {
    var type = this.get('type');
    var model = this.get('model');

    if (type && !Ember.isBlank(type) && type !== "undefined") {
      return model.filterBy('type', type);
    } else {
      return model;
    }
  }).readOnly(),

  _filter() {
    var query = this.get('search');
    var queryRegExp = new RegExp(query, 'i');
    var jobs = this.get('jobsByType');
    var filtered = this.get('filtered');
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

    filtered.replace(0, filtered.length, result.filterBy('live'));
  },

  _filtered: function() {
    Ember.run.once(this, this._filter);
  }.observes('model.@each.{title,description,type,location,company.name}',
             'jobsByType',
             'search').on('init')
});
