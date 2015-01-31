import Ember from 'ember';
import { initialize } from 'ember-jobs/initializers/component-store';

var container, application;

module('StoreComponentInitializer', {
  setup() {
    Ember.run(() => {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function() {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  ok(true);
});
