import DS from 'ember-data';

const { attr, belongsTo, hasMany, Model }  = DS;

export default Model.extend({
  name: attr('string'),
  capital: belongsTo('city', { inverse: 'capitalOf' }),
  cities: hasMany('city', { inverse: 'country' })
});
