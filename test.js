var test = require('tape'),
    geojsonRandom = require('./');

test('geojson-random', function(t) {
    t.equal(geojsonRandom(100, 'point').features.length, 100, '100 points');
    t.end();
});
