export default DS.Model.extend({
  live: DS.attr('boolean'),
  title: DS.attr('string'),
  company: DS.belongsTo('companie'),
  location: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  postedAt: DS.attr('date'),
  applyURL: DS.attr('string')
});
