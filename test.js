var test = require('tape'),
    geojsonRandom = require('./');

test('geojson-random', function(t) {
    t.equal(geojsonRandom(100, 'point').features.length, 100, '100 points');
    t.equal(geojsonRandom(100, 'polygon', 1, 20).features.length, 100, '100 polygons');
    t.end();
});
