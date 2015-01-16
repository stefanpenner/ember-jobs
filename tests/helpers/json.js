export default function json(status, payload) {
  return function(request) {
    return [
      status,
      { 'Content-Type' : 'text/json' },
      JSON.stringify(payload)
    ];
  };
}
