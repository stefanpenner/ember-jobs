import DS from 'ember-data';

/* global Firebase */
export default DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://ember-jobs.firebaseio.com/')
});
