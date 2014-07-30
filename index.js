var Random = require('random-js'),
    mt = new Random(Random.engines.mt19937().seed(0));

var pseudo = false,
    random = Math.random;

module.exports = function(count, type) {
    switch (type) {
        case 'point':
            var features = [];
            for (var i = 0; i < count; i++) { features.push(feature(point())); }
            return collection(features);
    }
};

module.exports.pseudo = function(_) {
    random = _ ? function() { return mt.real(0, 1); } : Math.random;
    return module.exports;
};

function rnd() { return random() - 0.5; }
function lon() { return rnd() * 360; }
function lat() { return rnd() * 180; }
function point() { return { type: 'Point', coordinates: [lon(), lat()] }; }
function feature(geom) {
    return { type: 'Feature', geometry: geom, properties: {} };
}
function collection(f) { return { type: 'FeatureCollection', features: f }; }
