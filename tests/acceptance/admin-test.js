import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import Ember from 'ember';
import Pretender from 'pretender';
import json from '../helpers/json';
import { stubResolver } from '../helpers/container';

var application, server;

module('admin', {
  beforeEach() {
    server = new Pretender();
    application = startApp({ }, function(app) {
      stubResolver(app, 'adapter:application', DS.RESTAdapter);
    });
  },

  afterEach() {
    server.shutdown();

    Ember.run(application, 'destroy');
  }
});

test('non admin', (assert) => {
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

  return visit('/admin').then(() => {
    assert.equal(currentPath(), 'index');
  });
});

function simulateAdmin() {
  application.__container__.lookup('service:session').set('isAdmin', true);
}

test('admin', (assert) => {
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

  return visit('/admin').then(() => {
    assert.equal(currentPath(), 'admin.index');
  });
});

