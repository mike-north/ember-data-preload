import Ember from 'ember';
import preload from 'ember-data-preload';

export default Ember.Route.extend({
  model() {
    return preload(this.store.findAll('country'), {cities: {neighborhoods: {streets: 'houses'}}});
  }
});
