import Ember from 'ember';
import preload from 'ember-data-preload';

const { Route } = Ember;

export default Route.extend({
  model() {
    return preload(this.store.findAll('country'), [
      {
        cities: {
          neighborhoods: [
            { streets: 'houses' },
            'parks'
          ]
        }
      },
      'capital'
    ]);
  }
});
