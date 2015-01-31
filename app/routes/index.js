import Ember from 'ember';

var hash = Ember.RSVP.hash;

export default Ember.Route.extend({
  model() {
    var jobs      = this.store.find('job');
    var companies = this.store.find('company');

    return hash({
      jobs,
      companies
    }).then( (result) => result.jobs );
  }
});
