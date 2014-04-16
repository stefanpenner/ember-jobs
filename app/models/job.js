var Job = DS.Model.extend({
  title: DS.attr('string'),
  company: DS.belongsTo('company'),
  location: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  postedAt: DS.attr('date'),
  applyURL: DS.attr('string')
});

export default Job;
