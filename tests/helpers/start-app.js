import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import DS from 'ember-data';

// soon, we wont need this.
// resolve vs require ordering quirk (long running bug)

export default function startApp(attrs, cb) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.extend({
      init() {
        this._super(...arguments);
        if (typeof cb === 'function') { cb(this); }
      }
    }).create(attributes);

    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
