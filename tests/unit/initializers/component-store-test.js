import Ember from 'ember';
import { initialize } from 'ember-jobs/initializers/component-store';
import {
  module,
  test
} from 'qunit';

var container, application;

module('StoreComponentInitializer', {
  beforeEach() {
    Ember.run(() => {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', (assert) => {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
