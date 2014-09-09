import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';

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

test('searching - edge case - switch from Full Time to All Types', function() {
  return visit('/').then(function() {
    fillIn($('#search-field'), 'yahoo');
    fillIn('.ember-select', 'Full Time');
    andThen(function() {
      equal(numberOfJobs(), 1, 'expected 1 job');
    });
    fillIn('.ember-select', 'All Job Types');
    andThen(function() {
      equal(numberOfJobs(), 1, 'expected 1 job');
    });
  });
});

test('search by company name directly with query param in url', function() {
  return visit('/?search=yahoo').then(function() {
    equal(numberOfJobs(), 1, 'expected 1 job');
  });
});
