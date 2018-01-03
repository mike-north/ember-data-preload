import DS from 'ember-data';

const { attr, hasMany, belongsTo, Model } = DS;

export default Model.extend({
  name: attr('string'),
  neighborhood: belongsTo('neighborhood'),
  houses: hasMany('house')
});
