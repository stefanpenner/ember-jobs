import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['our-modal'],

  /*
   * close if anything but the modal gets clicked
   */

  windowClick(e) {
    var target = Ember.$(e.target);

    if (target.is('.our-modal')) {
      this.sendAction('close');
    }
  },

  didInsertElement() {
    this._super(...arguments);
    Ember.$(window).on('click.' + Ember.guidFor(this), Ember.run.bind(this, this.windowClick));
  },

  willDestroyElement() {
    this._super(...arguments);
    Ember.$(window).off('click.' + Ember.guidFor(this));
  },

  actions: {
    close() {
      this.sendAction('close');
    }
  }
});
