import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

function numberOfJobs() {
  return Ember.$('.job-posting').length;
}

module('Acceptance: NewJob', {
  setup() {
    application = startApp();
  },

  teardown() {
    Ember.run(application, 'destroy');
  }
});

function isVisible(selector) {
  ok($(selector).is(':visible'), 'expected `' + selector + '` to be visible');
}

function isNotVisible(selector) {
  ok(!$(selector).is(':visible'), 'expected `' + selector + '` to NOT be visible');
}

test('visiting / and opening/closing the  new job modal', function() {

});

test('visiting / and adding a new job modal', function() {

});
