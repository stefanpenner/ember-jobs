import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import Pretender from 'pretender';
import Ember from 'ember';
import json from '../helpers/json';
import text from '../helpers/text';

var App, server;

module('test posting', {
  beforeEach() {
    server = new Pretender();
    App = startApp();
  },

  afterEach() {
    server.shutdown();
    Ember.run(App, 'destroy');
  }
});

test('searching', (assert) => {
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

  visit('/').then(() => {
    click('.job-posting:first a').then(() => {
      assert.equal(text('.job-title'), 'UI Engineer at Yahoo');
    });
  });
});

