import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('job', { path: '/jobs/:job_id' });
  this.resource('admin', function() {
    this.route('job', { path: '/jobs/:job_id' });
  });
});

export default Router;
