import DS from 'ember-data';

const { attr, belongsTo, Model }  = DS;

export default Model.extend({
  name: attr('string'),
  street: belongsTo('street')
});
