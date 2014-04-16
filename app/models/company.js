var Company = DS.Model.extend({
  name: DS.attr('string'),
  logo: DS.attr('string'),
  url:  DS.attr('string'),
  jobs: DS.hasMany('job')
});

export default Company;
