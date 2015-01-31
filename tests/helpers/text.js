export default function text(selector) {
  return $.trim($(selector).text()).replace(/\s+/g,' ');
}
