var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.route('job', { path: '/jobs/:job_id' });
});

export default Router;
