import startApp from '../helpers/start-app';
import { module, test } from 'qunit';
import Pretender from 'pretender';
import Ember from 'ember';
import json from '../helpers/json';
import text from '../helpers/text';
import { stubResolver } from '../helpers/container';

var application, server;

module('test posting', {
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

test('searching', async function test(assert) {
  server.get('/jobs', json(200, {
    jobs: [
      { id: 1, live: true, company: 1, title: 'UI Engineer'  },
      { id: 2, live: true, location: 'Palo Alto' },
      { id: 3, live: true, location: 'Palo Alto' }
    ]
  }));

  server.get('/companies', json(200, {
    companies: [
      { id: 1, name: 'Yahoo' }
    ]
  }));

  await visit('/');
  await click('.job-posting:first a');

  assert.equal(text('.job-title'), 'UI Engineer at Yahoo');
});

