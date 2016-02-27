import Ember from 'ember';

const { RSVP } = Ember;

function preloadRecord(record, toPreload) {
  return preloadAll([record], toPreload).then(() => {
    return record;
  });
}

function preloadAll(records, toPreload) {
    switch(Ember.typeOf(toPreload)) {
      case 'object':
        const properties = Object.keys(toPreload);
        return RSVP.all(properties.map((p) => {
          return RSVP.all(records.map((record) => {
            return record.get(p);
          })).then((data) => {
            const subRecords = data.reduce((prev, cur) => prev.concat(cur.toArray()), []);
            return preloadAll(subRecords, toPreload[p]);
          });
        })).then(() => records);
      case 'string':
        return RSVP.all(records.map((record) => record.get(toPreload)))
          .then(() => records);
      default: throw 'Illegal Argument';
    }
}

function preload(thing, toPreload) {
  if (thing.then) {
    return thing.then(() => {
      return Ember.isArray(thing) ? preloadAll(thing, toPreload) : preloadRecord(thing, toPreload);
    });
  }
  else {
    return Ember.isArray(thing) ? preloadAll(thing, toPreload) : preloadRecord(thing, toPreload);
  }

}

export default preload;
