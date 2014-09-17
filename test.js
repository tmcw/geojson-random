var test = require('tape'),
    geojsonRandom = require('./');

test('geojson-random', function(t) {
    t.equal(geojsonRandom(100, 'point').features.length, 100, '100 points');
    t.end();
});

test('within range', function(t) {
    var extent = [-90, -5, 154, 23];
    var fc = geojsonRandom(100, 'point', extent);
    fc.features.forEach(function(f) {
        var geom = f.geometry.coordinates;
        t.ok(geom[0] > extent[0] && geom[0] < extent[2], 'x coords in range');
        t.ok(geom[1] > extent[1] && geom[1] < extent[3], 'y coords in range');
    });
    t.end();
});