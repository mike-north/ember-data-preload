import Route from '@ember/routing/route';
import preload from 'ember-data-preload';

export default Route.extend({
  model() {
    return preload(this.store.findAll('country'), [
      {
        cities: {
          neighborhoods: [{ streets: 'houses' }, 'parks']
        }
      },
      'capital'
    ]);
  }
});
