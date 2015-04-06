import startApp from '../helpers/start-app';
import { module, test } from 'qunit';
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

test('non admin', async function test(assert) {
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

  await visit('/admin');
  assert.equal(currentPath(), 'index');
});

function simulateAdmin() {
  application.__container__.lookup('service:session').set('isAdmin', true);
}

test('admin', async function test(assert) {
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

  await visit('/admin');
  assert.equal(currentPath(), 'admin.index');
});

