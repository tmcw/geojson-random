var test = require('tape'),
    geojsonRandom = require('./');

test('geojson-random', function(t) {
    t.equal(geojsonRandom(100, 'point').features.length, 100, '100 points');
    t.deepEqual(geojsonRandom.pseudo(true)(1, 'point'),
        { "features": [ { geometry: { coordinates: [ 169.2190806503591, 37.40757559196183 ], type: 'Point' }, properties: {}, type: 'Feature' } ], type: 'FeatureCollection' },
    'pseudorandom');
    t.end();
});
