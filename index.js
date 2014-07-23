module.exports = function(count, type) {
    switch (type) {
        case 'point':
            var features = [];
            for (var i = 0; i < count; i++) { features.push(feature(point())); }
            return collection(features);
    }
};

function rnd() { return Math.random() - 0.5; }
function lon() { return rnd() * 360; }
function lat() { return rnd() * 180; }
function point() { return { type: 'Point', coordinates: [lon(), lat()] }; }
function feature(geom) {
    return { type: 'Feature', geometry: geom, properties: {} };
}
function collection(f) { return { type: 'FeatureCollection', features: f }; }
