export function initialize(container, application) {
  application.inject('route', 'sessionService', 'service:session');
}

export default {
  name: 'session-service',
  initialize: initialize
};
