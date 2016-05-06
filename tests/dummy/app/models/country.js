import DS from 'ember-data';

const { attr, belongsTo, hasMany }  = DS;

export default DS.Model.extend({
  name: attr('string'),
  capital: belongsTo('city', {inverse: 'capitalOf'}),
  cities: hasMany('city', {inverse: 'country'})
});
