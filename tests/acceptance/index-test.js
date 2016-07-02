import {
  test
} from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

let server = null;

function json(obj) {
  return [200, {}, JSON.stringify(obj)];
}

moduleForAcceptance('Acceptance | index', {
  beforeEach() {
    server = new Pretender();
  },
  afterEach() {
    server.shutdown();
  }
});

test('visiting /', function(assert) {
  assert.expect(7);

  server.get('/countries', function() {
    assert.ok(true, 'Countries requested');
    return json({
      countries: [{
        id: 1,
        name: 'USA',
        cities: [1, 2],
        capital: 1
      }]
    });
  });

  server.get('/cities', function() {
    assert.ok(true, 'Cities requested');
    return json({
      cities: [{
        country: 1,
        id: 1,
        name: 'Washington, DC',
        neighborhoods: [1]
      }, {
        country: 1,
        id: 2,
        name: 'San Francisco',
        neighborhoods: [2, 3]
      }]
    });
  });

  server.get('/neighborhoods', function() {
    assert.ok(true, 'Neighborhoods requested');
    return json({
      neighborhoods: [{
        city: 1,
        id: 1,
        name: 'Adams Morgan',
        streets: [1, 2],
        parks: [1, 2]
      }, {
        city: 2,
        id: 2,
        name: 'Tenderloin',
        streets: [3],
        parks: []
      }, {
        city: 2,
        id: 3,
        name: 'Financial District',
        streets: [],
        parks: [3]
      }]
    });
  });

  server.get('/parks', function() {
    assert.ok(true, 'Parks requested');
    return json({
      parks: [{
        neighborhood: 1,
        id: 1,
        name: 'Smithsonian National Zoological Park'
      }, {
        neighborhood: 1,
        id: 2,
        name: 'Meridian Hill Park'
      }, {
        neighborhood: 2,
        id: 3,
        name: 'Sue Bierman Park'
      }]
    });
  });

  server.get('/streets', function() {
    assert.ok(true, 'Streets requested');
    return json({
      streets: [{
        neighborhood: 1,
        id: 1,
        name: 'California St.',
        houses: [1, 2]
      }, {
        neighborhood: 2,
        id: 2,
        name: 'Eddie St.',
        houses: []
      }, {
        neighborhood: 2,
        id: 3,
        name: 'Sacramento St.',
        houses: []
      }]
    });
  });

  server.get('/houses', function() {
    assert.ok(true, 'Houses requested');
    return json({
      houses: [{
        street: 1,
        id: 1,
        name: 'A house'
      }, {
        street: 1,
        id: 2,
        name: 'Another house'
      }]
    });
  });

  visit('/');

  andThen(function() {
    assert.equal(this.$('.country').text(), 'USA', 'One country div on the screen');
    assert.equal(currentURL(), '/');
  });
});