var extent = [-180, -90, 180, 90];

module.exports = function(count, type, bounds) {
    if (bounds) extent = bounds;

    switch (type) {
        case 'point':
            var features = [];
            for (var i = 0; i < count; i++) { features.push(feature(point())); }
            return collection(features);
    }
};

function lon() {
    var range = extent[2] - extent[0];
    return (Math.random() * range) + extent[0];
}

function lat() {
    var range = extent[3] - extent[1];
    return (Math.random() * range) + extent[1];
}

function point() { return { type: 'Point', coordinates: [lon(), lat()] }; }
function feature(geom) {
    return { type: 'Feature', geometry: geom, properties: {} };
}
function collection(f) { return { type: 'FeatureCollection', features: f }; }
