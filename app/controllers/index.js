export default Ember.ArrayController.extend({
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
 _filter: function() {
   // TODO: real search, proper one at a time semantics
   var type = this.get('type');
   var query = this.get('search');
   var queryRegExp = new RegExp(query,'i');
   var model = this.get('model');
   var filtered = this.get('filtered');
   var result;

   if (Ember.isBlank(query) && Ember.isBlank(type)) {
      result = model.toArray();
   } else {
     result = model.filter(function(job) {
       if (type) {
         return job.get('type') === type;
       } else {
         return true;
       }
     }).filter(function(job) {
       return queryRegExp.test(job.get('title')) ||
         queryRegExp.test(job.get('description')) ||
         queryRegExp.test(job.get('type')) ||
         queryRegExp.test(job.get('company.name')) ||
         queryRegExp.test(job.get('location'));
     });
   }

   filtered.replace(0, filtered.length, result)
 },
 _filtered: function() {
    Ember.run.once(this, this._filter);
 }.observes('model.@each.{title,description,type,location,company.name}','type','search').on('init'),
 type: Ember.computed(function(key, value) {
    if (arguments.length === 2) {
      return value === undefined ? null : value;
    }
  })
});
