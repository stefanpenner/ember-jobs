import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import DS from 'ember-data';

// soon, we wont need this.
// resolve vs require ordering quirk (long running bug)

function stubContainer(container, name, thing) {
  container._registry._resolveCache[name] =  thing;
}

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.extend({
      init() {
        this._super(...arguments);
        // soon we will have a much more reasonable solution
        stubContainer(this.__container__, 'adapter:application', DS.RESTAdapter);
      }
    }, attributes).create();

    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
