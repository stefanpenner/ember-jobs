import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';
import json from '../helpers/json';
import text from '../helpers/text';
import { module, test } from 'qunit';
import { stubResolver } from '../helpers/container';

var application, server;

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}

module('Acceptance: NewJob', {
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

function isVisible(assert, selector) {
  assert.ok($(selector).is(':visible'), 'expected `' + selector + '` to be visible');
}

function isNotVisible(assert, selector) {
  assert.ok(!$(selector).is(':visible'), 'expected `' + selector + '` to NOT be visible');
}

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}

test('visiting / and opening/closing the  new job modal', async function test(assert) {
  server.get('/jobs',      json(200, { jobs:      [] }));
  server.get('/companies', json(200, { companies: [] }));

  await visit('/');
  await click('#post-job');

  isVisible(assert, '.new-job-modal');

  await click('.our-modal');

  isNotVisible(assert, '.new-job-modal');
});

test('visiting / and adding a new job modal', async function test(assert) {
  server.get('/jobs',      json(200, { jobs:      [] }));
  server.get('/companies', json(200, { companies: [] }));

  server.post('/jobs', json(201, {
    jobs: [{
      id: 1,
      live: true,
      title: 'Cool Job',
      type: 'Full Time',
      description: 'Job Description',
      company: 1
    }],

    companies: [
      {
        id: 1,
        name: 'Yahoo'
      }
    ]
  }));

  await visit('/');
  let pending = click('#post-job');
  // check....

  await pending

  assert.equal(numberOfJobs(), 0, 'expected NO jobs');

  isVisible(assert, '.new-job-modal');

  await fillIn('label[name=title]       input', 'Cool Job');
  await fillIn('label[name=type]        input', 'Full Time');
  await fillIn('label[name=description] input', 'Job Description');

  await click('#save');

  assert.equal(numberOfJobs(), 1, 'expected one jobs');
  assert.equal(text('.job-posting:first .name-and-company'), 'Cool Job at Yahoo');
});
