import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['session'],
  isAdmin: Ember.computed.readOnly('controllers.session.isAdmin'),
  queryParams: [
    'type',
    'search'
  ],
  types: [
    'Full Time',
    'Part Time'
  ],
 search: null,
 init: function() {
   this._super();
   this.set('filtered', []);
 },
  jobsByType: function() {
    var type = this.get('type');
    var model = this.get('model');
    if (type && !Ember.isBlank(type) && type !== "undefined") {
      return model.filterBy('type', type);
    } else {
      return model;
    }
  }.property('type'),
 _filter: function() {
   // TODO: real search, proper one at a time semantics
   var query = this.get('search');
   var queryRegExp = new RegExp(query,'i');
   var model = this.get('jobsByType');
   var filtered = this.get('filtered');
   var result;

   if (Ember.isBlank(query)) {
      result = model.toArray();
   } else {
      result = model.filter(function(job) {
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
 }.observes('model.@each.{title,description,type,location,company.name}','jobsByType','search').on('init')
});
