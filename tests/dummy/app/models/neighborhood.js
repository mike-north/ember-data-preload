import DS from 'ember-data';

const { attr, hasMany, belongsTo, Model }  = DS;

export default Model.extend({
  name: attr('string'),
  city: belongsTo('city'),
  streets: hasMany('street')
});
