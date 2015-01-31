import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';
import json from '../helpers/json';
import text from '../helpers/text';

var application, server;

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}

module('Acceptance: NewJob', {
  setup() {
    server = new Pretender();
    application = startApp();
  },

  teardown() {
    server.shutdown();
    Ember.run(application, 'destroy');
  }
});

function isVisible(selector) {
  ok($(selector).is(':visible'), 'expected `' + selector + '` to be visible');
}

function isNotVisible(selector) {
  ok(!$(selector).is(':visible'), 'expected `' + selector + '` to NOT be visible');
}

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}


test('visiting / and opening/closing the  new job modal', function() {
  server.get('/jobs',      json(200, { jobs:      [] }));
  server.get('/companies', json(200, { companies: [] }));

  visit('/');
  click('#post-job');

  andThen(() => isVisible('.new-job-modal') );

  click('.our-modal');

  andThen(() => isNotVisible('.new-job-modal') );
});

test('visiting / and adding a new job modal', function() {
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

  visit('/');
  click('#post-job');

  andThen(() => {
    equal(numberOfJobs(), 0, 'expected NO jobs');

    isVisible('.new-job-modal');
  });

  fillIn('label[name=title]       input', 'Cool Job');
  fillIn('label[name=type]        input', 'Full Time');
  fillIn('label[name=description] input', 'Job Description');

  click('#save');

  andThen(() => {
    equal(numberOfJobs(), 1, 'expected one jobs');
    equal(text('.job-posting:first .name-and-company'), 'Cool Job at Yahoo');
  });
});
