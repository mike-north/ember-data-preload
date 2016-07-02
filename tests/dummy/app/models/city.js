import DS from 'ember-data';

const { attr, hasMany, belongsTo, Model }  = DS;

export default Model.extend({
  name: attr('string'),
  country: belongsTo('country', { inverse: 'cities' }),
  capitalOf: belongsTo('country', { inverse: 'capital' }),
  neighborhoods: hasMany('neighborhood')
});
