import startApp from '../helpers/start-app';
import { module, test } from 'qunit';
import Ember from 'ember';
import Pretender from 'pretender';
import json from '../helpers/json';
import { stubResolver } from '../helpers/container';

var application, server;

module('test app', {
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

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}

test('searching', async function(assert) {
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

  await visit('/');
  assert.equal(numberOfJobs(), 3, 'expected 3 jobs');

  await fillIn($('#search-field'), 'UI');
  assert.equal(numberOfJobs(), 1, 'expected 1 jobs');

  await fillIn($('#search-field'), 'ASDFASDF');
  assert.equal(numberOfJobs(), 0, 'expected 0 jobs');

  await fillIn($('#search-field'), 'Palo alto');
  assert.equal(numberOfJobs(), 2, 'expected 2 jobs');

  await fillIn($('#search-field'), '');
  assert.equal(numberOfJobs(), 3, 'expected 3 jobs');
});

test('searching - edge case', async function(assert) {
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

  await visit('/');
  assert.equal(numberOfJobs(), 4, 'expected 3 jobs');

  await fillIn('.job-type', 'Full Time');
  assert.equal(numberOfJobs(), 3, 'expected 3 jobs');
});

test('searching - edge case - switch from Full Time to All Types', async function(assert) {
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

  await visit('/');
  await fillIn($('#search-field'), 'yahoo');
  await fillIn('.job-type', 'Full Time');

  assert.equal(numberOfJobs(), 1, 'expected 1 job');

  await fillIn('.job-type', 'All Job Types');

  assert.equal(numberOfJobs(), 1, 'expected 1 job');
});

test('search by company name directly with query param in url', async function(assert) {
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

  await visit('/?search=yahoo');
  assert.equal(numberOfJobs(), 1, 'expected 1 job');
});
