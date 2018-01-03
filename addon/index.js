import { resolve, all } from 'rsvp';
import { get } from '@ember/object';
import { isArray } from '@ember/array';
import { typeOf } from '@ember/utils';

function getPromise(object, property) {
  return resolve(get(object, property));
}

function preloadRecord(record, toPreload) {
  if (!record) {
    return resolve(record);
  }

  switch (typeOf(toPreload)) {
    case 'string':
      return getPromise(record, toPreload).then(() => record);
    case 'array':
      return all(toPreload.map(p => preloadRecord(record, p))).then(() => record);
    case 'object':
      return all(Object.keys(toPreload).map(p => getPromise(record, p).then(data => preload(data, toPreload[p])))).then(
        () => record
      );
    default:
      throw 'Illegal Argument';
  }
}

function preloadAll(records, toPreload) {
  return all(records.map(record => preload(record, toPreload)));
}

function preload(thing, toPreload) {
  return resolve(thing).then(() => {
    return isArray(thing) ? preloadAll(thing, toPreload) : preloadRecord(thing, toPreload);
  });
}

export default preload;
