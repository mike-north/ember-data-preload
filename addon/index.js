import Ember from 'ember';

const { RSVP, typeOf, isArray, get } = Ember;

function getPromise(object, property) {
  return RSVP.resolve(get(object, property));
}

function preloadRecord(record, toPreload) {
  if (!record) {
    return RSVP.resolve(record);
  }

  switch (typeOf(toPreload)) {
    case 'string':
      return getPromise(record, toPreload).then(() => record);
    case 'array':
      return RSVP.all(toPreload.map((p) => preloadRecord(record, p))).then(() => record);
    case 'object':
      return RSVP.all(Object.keys(toPreload).map((p) =>
        getPromise(record, p).then((data) => preload(data, toPreload[p])))).then(() => record);
    default: throw 'Illegal Argument';
  }
}

function preloadAll(records, toPreload) {
  return RSVP.all(records.map((record) => preload(record, toPreload)));
}

function preload(thing, toPreload) {
  return RSVP.resolve(thing).then(() => {
    return isArray(thing) ? preloadAll(thing, toPreload) : preloadRecord(thing, toPreload);
  });
}

export default preload;
