import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';

var App;

module('admin', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('non admin', function() {
  return visit('/admin').then(function() {
    equal(currentPath(), 'index');
  });
});

function simulateAdmin() {
  App.__container__.lookup('controller:session').set('isAdmin', true);
}

test('non admin', function() {
  simulateAdmin();

  return visit('/admin').then(function() {
    equal(currentPath(), 'admin.index');
  });
});

