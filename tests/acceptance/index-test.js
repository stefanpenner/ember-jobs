import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';

var App;

module('test app', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}

function selectType(type) {
  Ember.run(function(){
    // TODO: replace with testing select helper
    App.__container__.lookup('controller:index').set('type', type);
  });
}


test('searching', function() {
  return visit('/').then(function() {
    equal(numberOfJobs(), 3, 'expected 3 jobs');

    fillIn($('#search-field'), 'UI').then(function() {
      equal(numberOfJobs(), 2, 'expected 2 jobs');
    });

    fillIn($('#search-field'), 'ASDFASDF').then(function() {
      equal(numberOfJobs(), 0, 'expected 0 jobs');
    });

    fillIn($('#search-field'), 'Palo alto').then(function() {
      equal(numberOfJobs(), 2, 'expected 2 jobs');
    });

    return fillIn($('#search-field'), '').then(function() {
      equal(numberOfJobs(), 3, 'expected 3 jobs');
    });
  });
});

test('searching - edge case', function() {
  return visit('/').then(function() {
    equal(numberOfJobs(), 3, 'expected 3 jobs');

    selectType('Full Time');
    equal(numberOfJobs(), 3, 'expected 3 jobs');
  });
});

