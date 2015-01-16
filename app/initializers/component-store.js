export function initialize(container, application) {
  application.inject('component', 'store', 'store:main');
}

export default {
  name: 'component-store',
  initialize: initialize
};
