# ember-data-preload [![Build Status](https://travis-ci.org/levanto-financial/ember-data-preload.svg?branch=master)](https://travis-ci.org/levanto-financial/ember-data-preload) [![Ember Observer Score](https://emberobserver.com/badges/ember-data-preload.svg)](https://emberobserver.com/addons/ember-data-preload)


# Why?
Preloading deeply nested relationships is possible w/ ember-data, but it can be a little messy

For example, if we have a `List` model, each record of which has many `ListItem`s, each of which has an `Assignee`, and we wanted to load all of the relevant data by the time the route was done resolving, we'd have to do something like this:

```js

Ember.Route.extend({
  model() {

    // Load lists
    return this.store.findAll('lists').then((lists) => {
      
      // Get promises for loading all list-items owned by the lists,
      //   and wait for them all to resolve
      return Ember.RSVP.all(
        lists.map((l) => l.get('list-item'))
          .reduce((prev, cur) => prev.concat(cur))
      ).then((listItems) => {
        // Get promises for loading all assignees of the list-items,
        return Ember.RSVP.all(
          listItems.map((listItem) => listItem.get('assignee'))
            .reduce((prev, cur) => prev.concat(cur))
        );
      }).then(() => lists);
    });
  }
});

```

# Use

First, install this addon in your ember-cli app
`ember install ember-data-preload`

And then, you may preload relationships (i.e., in a route)

```js
import preload from 'ember-data-preload';

export default Ember.Route.extend({
  model() {
    return preload(this.store.findAll('lists'), {'list-items': 'assignees'});
  }
});

```


Particularly when relationship hierarchies are deep, this can be particularly time-saving

```js
import preload from 'ember-data-preload';

export default Ember.Route.extend({
  model() {
    return preload(this.store.findAll('country'), {
      city: {
        neighborhood: {
          street: 'house'
        }
      }
    });
  }
});

```

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
