import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';

var App;

module('test posting', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('searching', function() {
  return visit('/').then(function() {
    return click('.job-list-item:first a').then(function(){
      equal($('.job-title').text(), 'UI Engineer');
    });
  });
});

