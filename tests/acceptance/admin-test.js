import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';
import Pretender from 'pretender';
import json from '../helpers/json';

var App, server;

module('admin', {
  setup() {
    server = new Pretender();

    App = startApp();
  },
  teardown() {
    Ember.run(App, 'destroy');
  }
});

test('non admin', () => {
  server.get('jobs', json(200, {
    jobs: [
      { id: 1, live: true }
    ]
  }));


  server.get('companies', json(200, {
    companies: [
      { id: 1 }
    ]
  }));

  visit('/admin').then(() => {
    equal(currentPath(), 'index');
  });
});

function simulateAdmin() {
  App.__container__.lookup('service:session').set('isAdmin', true);
}

test('admin', () => {
  simulateAdmin();

  server.get('jobs', json(200, {
    jobs: [
      { id: 1, live: true }
    ]
  }));

  server.get('companies', json(200, {
    companies: [
      { id: 1 }
    ]
  }));

  visit('/admin').then(() => {
    equal(currentPath(), 'admin.index');
  });
});

