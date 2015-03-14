import Ember from 'ember';

export default Ember.Route.extend({
  async model() {
    // in sequence
    var jobs      = await this.store.find('job');
    var companies = await this.store.find('company');

    return jobs;
  }
});
