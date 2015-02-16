import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import { module } from 'qunit';
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

function selectType(type) {
  // TODO: replace with testing select helper
  Ember.run(() => application.__container__.lookup('controller:index').set('type', type));
}

test('searching', (assert) => {
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

  return visit('/').then(() => {
    assert.equal(numberOfJobs(), 3, 'expected 3 jobs');

    fillIn($('#search-field'), 'UI').then(() => {
      assert.equal(numberOfJobs(), 1, 'expected 1 jobs');
    });

    fillIn($('#search-field'), 'ASDFASDF').then(() => {
      assert.equal(numberOfJobs(), 0, 'expected 0 jobs');
    });

    fillIn($('#search-field'), 'Palo alto').then(() => {
      assert.equal(numberOfJobs(), 2, 'expected 2 jobs');
    });

    return fillIn($('#search-field'), '').then(() => {
      assert.equal(numberOfJobs(), 3, 'expected 3 jobs');
    });
  });
});

test('searching - edge case', (assert) => {
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

  return visit('/').then(() => {
    assert.equal(numberOfJobs(), 4, 'expected 3 jobs');

    selectType('Full Time');
    assert.equal(numberOfJobs(), 3, 'expected 3 jobs');
  });
});

test('searching - edge case - switch from Full Time to All Types', (assert) => {
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

    andThen(() => assert.equal(numberOfJobs(), 1, 'expected 1 job'));

    fillIn('.ember-select', 'All Job Types');

    andThen(() => assert.equal(numberOfJobs(), 1, 'expected 1 job') );
  });
});

test('search by company name directly with query param in url', (assert) => {
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
    assert.equal(numberOfJobs(), 1, 'expected 1 job');
  });
});
