import DS from 'ember-data';

const { attr, hasMany, belongsTo }  = DS;

export default DS.Model.extend({
  name: attr('string'),
  city: belongsTo('city'),
  streets: hasMany('street')
});
