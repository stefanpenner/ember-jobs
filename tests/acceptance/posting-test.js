import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';

var App;

module('test posting', {
  setup() {
    App = startApp();
  },
  teardown() {
    Ember.run(App, 'destroy');
  }
});

test('searching', () => {
 return visit('/').then(() => {
    return click('.job-posting:first a').then(() => {
      equal($('.job-title').text(), 'UI Engineer at Yahoo');
    });
  });
});

