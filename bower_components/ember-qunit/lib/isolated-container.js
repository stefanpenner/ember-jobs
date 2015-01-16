import testResolver from './test-resolver';
import Ember from 'ember';

export default function isolatedContainer(fullNames) {
  var resolver = testResolver.get();
  var registry = Ember.Registry ? new Ember.Registry() : {};
  var container = new Ember.Container(registry);

  if (!Ember.Registry) {
    registry = container;
  }

  registry.optionsForType('component', { singleton: false });
  registry.optionsForType('view', { singleton: false });
  registry.optionsForType('template', { instantiate: false });
  registry.optionsForType('helper', { instantiate: false });

  registry.register('component-lookup:main', Ember.ComponentLookup);

  for (var i = fullNames.length; i > 0; i--) {
    var fullName = fullNames[i - 1];
    registry.register(fullName, resolver.resolve(fullName));
  }

  return container;
}
