import DS from 'ember-data';
import ENV from 'ember-jobs/config/environment';

/* global Firebase */
export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(ENV.firebase)
});
