var Job = DS.Model.extend({
  title: DS.attr('string'),
  company: DS.belongsTo('company'),
  location: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  postedAt: DS.attr('date'),
  applyURL: DS.attr('string')
});

Job.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: 'UI Engineer',
      company: 1,
      location: 'Sunnyvale',
      type: 'Full Time',
      applyURL: false,
      description: 'long description'
    },
    {
      id: 2,
      title: 'UI Engineer',
      company: 2,
      location: 'Palo Alto, CA',
      type: 'Full Time',
      applyURL: 'http://hire.jobvite.com/CompanyJobs/Careers.aspx?k=Apply&c=qW69VfwQ&j=oa0qYfwi',
      description: 'long description'
    },
    {
      id: 3,
      title: 'Online Store Engineer',
      company: 2,
      location: 'Palo Alto, CA',
      type: 'Full Time',
      applyURL: 'http://hire.jobvite.com/CompanyJobs/Careers.aspx?k=Apply&c=qW69VfwQ&j=oa0qYfwi',
      description: 'long description'
    }
  ]
});
export default Job;
