#!/usr/bin/env node

var count = (process.argv[2] && parseInt(process.argv[2], 10)) || 100;
var type = process.argv[3] || 'point';

switch (type) {
    case 'point':
        var features = [];
        for (var i = 0; i < count; i++) { features.push(feature(point())); }
        console.log(JSON.stringify(collection(features)));
        break;
}

function lon() { return (Math.random() - 0.5) * 360; }
function lat() { return (Math.random() - 0.5) * 180; }
function point() { return { type: 'Point', coordinates: [lon(), lat()] }; }
function feature(geom) {
    return { type: 'Feature', geometry: geom, properties: {} };
}
function collection(f) { return { type: 'FeatureCollection', features: f }; }
