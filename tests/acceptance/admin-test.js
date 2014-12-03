import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';

var App;

module('admin', {
  setup() {
    App = startApp();
  },
  teardown() {
    Ember.run(App, 'destroy');
  }
});

test('non admin', () => {
  return visit('/admin').then(() => {
    equal(currentPath(), 'index');
  });
});

function simulateAdmin() {
  App.__container__.lookup('controller:session').set('isAdmin', true);
}

test('admin', () => {
  simulateAdmin();

  return visit('/admin').then(() => {
    equal(currentPath(), 'admin.index');
  });
});

