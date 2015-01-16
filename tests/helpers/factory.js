import Ember from 'ember';

var id = 0;

export default function factory(attrs = {}) {
  return Ember.merge({
    id: id++
  }, attrs);
}
