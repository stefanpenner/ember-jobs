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
var i = 0;
function job(attrs) {
  return Ember.merge(JSON.parse(JSON.stringify({
    id: i++,
    live: true,
    title: 'I am a job title',
    location: 'Boston',
    type: 'Full Time',
    description: 'a cool job'
  })), attrs);
}

test('searching', () => {
  server.get('/jobs', json(200, {
    jobs: [
      job({ title: 'UI Engineer'     }),
      job({ location: 'Palo Alto', title: 'UI Engineer'     }),
      job({ location: 'Palo Alto', title: 'Backend Engineer'}),
    ]
  }));

  server.get('/companies', json(200, {
    companies: []
  }));

  return visit('/').then(() => {
    equal(numberOfJobs(), 3, 'expected 3 jobs');

    fillIn($('#search-field'), 'UI').then(() => {
      equal(numberOfJobs(), 2, 'expected 2 jobs');
    });

    fillIn($('#search-field'), 'ASDFASDF').then(() => {
      equal(numberOfJobs(), 0, 'expected 0 jobs');
    });

    fillIn($('#search-field'), 'Palo alto').then(() => {
      equal(numberOfJobs(), 2, 'expected 2 jobs');
    });

    return fillIn($('#search-field'), '').then(() => {
      equal(numberOfJobs(), 3, 'expected 3 jobs');
    });
  });
});

test('searching - edge case', () => {
  return visit('/').then(() => {
    equal(numberOfJobs(), 4, 'expected 3 jobs');

    selectType('Full Time');
    equal(numberOfJobs(), 3, 'expected 3 jobs');
  });
});

test('searching - edge case - switch from Full Time to All Types', () => {
  return visit('/').then(() => {
    fillIn($('#search-field'), 'yahoo');
    fillIn('.ember-select', 'Full Time');
    andThen(() => equal(numberOfJobs(), 1, 'expected 1 job'));

    fillIn('.ember-select', 'All Job Types');
    andThen(() => equal(numberOfJobs(), 1, 'expected 1 job') );
  });
});

test('search by company name directly with query param in url', () => {
  return visit('/?search=yahoo').then(() => {
    equal(numberOfJobs(), 1, 'expected 1 job');
  });
});
