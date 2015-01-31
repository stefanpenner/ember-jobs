import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';
import Pretender from 'pretender';
import json from '../helpers/json';

var App, server;

module('test posting', {
  setup() {
    server = new Pretender();
    App = startApp();
  },
  teardown() {
    server.shutdown();
    Ember.run(App, 'destroy');
  }
});

test('searching', () => {
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
      equal($('.job-title').text(), 'UI Engineer at Yahoo');
    });
  });
});

