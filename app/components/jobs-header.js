import Ember from 'ember';

export default Ember.Component.extend({
  sessionService: Ember.inject.service('session'),
  isAdmin: Ember.computed.readOnly('sessionService.isAdmin')
});
