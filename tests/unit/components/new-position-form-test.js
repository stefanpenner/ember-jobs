import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('new-position-form', 'NewPositionFormComponent', {
  // specify the other units that are required for this test
  needs: ['component:new-company-form', 'component:new-job-form']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});
