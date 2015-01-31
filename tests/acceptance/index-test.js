import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';
import Pretender from 'pretender';
import json from '../helpers/json';

var App, server;

module('test app', {
  setup() {
    server = new Pretender();
    App = startApp();
  },

  teardown() {
    server.shutdown();
    Ember.run(App, 'destroy');
  }
});

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}

function selectType(type) {
  // TODO: replace with testing select helper
  Ember.run(() => App.__container__.lookup('controller:index').set('type', type));
}

test('searching', () => {
  server.get('/jobs', json(200, {
    jobs: [
      { id: 1, live: true, title: 'UI Engineer'  },
      { id: 2, live: true, location: 'Palo Alto' },
      { id: 3, live: true, location: 'Palo Alto' }
    ]
  }));

  server.get('/companies', json(200, {
    companies: []
  }));

  visit('/').then(() => {
    equal(numberOfJobs(), 3, 'expected 3 jobs');

    fillIn($('#search-field'), 'UI').then(() => {
      equal(numberOfJobs(), 1, 'expected 2 jobs');
    });

    fillIn($('#search-field'), 'ASDFASDF').then(() => {
      equal(numberOfJobs(), 0, 'expected 0 jobs');
    });

    fillIn($('#search-field'), 'Palo alto').then(() => {
      equal(numberOfJobs(), 2, 'expected 2 jobs');
    });

    fillIn($('#search-field'), '').then(() => {
      equal(numberOfJobs(), 3, 'expected 3 jobs');
    });
  });
});

test('searching - edge case', () => {
  server.get('/jobs', json(200, {
    jobs: [
      { id: 1, live: true, title: 'UI Engineer',  type: 'Full Time' },
      { id: 2, live: true, title: 'UI Engineer',  type: 'Full Time' },
      { id: 3, live: true, location: 'Palo Alto', type: 'Full Time' },
      { id: 4, live: true, location: 'Palo Alto', type: 'Part Time' }
    ]
  }));

  server.get('/companies', json(200, {
    companies: []
  }));

  visit('/').then(() => {
    equal(numberOfJobs(), 4, 'expected 3 jobs');

    selectType('Full Time');
    equal(numberOfJobs(), 3, 'expected 3 jobs');
  });
});

test('searching - edge case - switch from Full Time to All Types', () => {
  server.get('/jobs', json(200, {
    jobs: [
      { id: 1, live: true, title: 'UI Engineer',  company: 1, type: 'Full Time' },
      { id: 3, live: true, location: 'Palo Alto', company: 3, type: 'Full Time' }
    ]
  }));

  server.get('/companies', json(200, {
    companies: [
      { id: 1, name: 'yahoo'   },
      { id: 3, name: 'netflix' }
    ]
  }));

  visit('/').then(() => {
    fillIn($('#search-field'), 'yahoo');
    fillIn('.ember-select', 'Full Time');

    andThen(() => equal(numberOfJobs(), 1, 'expected 1 job'));

    fillIn('.ember-select', 'All Job Types');

    andThen(() => equal(numberOfJobs(), 1, 'expected 1 job') );
  });
});

test('search by company name directly with query param in url', () => {
  server.get('/jobs', json(200, {
    jobs: [
      { id: 1, live: true, title: 'UI Engineer',  company: 1, type: 'Full Time' },
      { id: 2, live: true, title: 'UI Engineer',  company: 2, type: 'Full Time' }
    ]
  }));

  server.get('/companies', json(200, {
    companies: [
      { id: 1, name: 'yahoo' },
      { id: 2, name: 'apple' }
    ]
  }));

  visit('/?search=yahoo').then(() => {
    equal(numberOfJobs(), 1, 'expected 1 job');
  });
});
