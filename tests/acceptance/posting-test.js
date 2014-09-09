import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';

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
    return click('.job-posting:first a').then(function(){
      equal($('.job-title').text(), 'UI Engineer at Yahoo');
    });
  });
});

