import DS from 'ember-data';
import config from 'ember-jobs/config/environment';

/* global Firebase */
export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(config.firebase)
});
