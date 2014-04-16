var Company = DS.Model.extend({
  name: DS.attr('string'),
  logo: DS.attr('string'),
  url:  DS.attr('string'),
  jobs: DS.hasMany('job')
});

Company.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'Yahoo',
      url: 'http://www.yahoo.com/',
      jobs: [1]
    },
    {
      id: 2,
      name: 'Nest',
      url: 'https://nest.com/',
      logo: 'https://d6dyoorq84mou.cloudfront.net/uploads/job/logo/10056/nest_logo.png',
      jobs: [2, 3]
    }
  ]
});

export default Company;
