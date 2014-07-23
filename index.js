#!/usr/bin/env node

var fc = { type: 'FeatureCollection', features: [] };

switch (process.argv[2]) {
    default:
        for (var i = 0; i < 100; i++) {
            fc.features.push({
                type: 'Feature',
                geometry: point(),
                properties: {}
            });
        }
        console.log(JSON.stringify(fc));
        break;
}

function lon() { return (Math.random() - 0.5) * 360; }
function lat() { return (Math.random() - 0.5) * 180; }
function point() { return { type: 'Point', coordinates: [lon(), lat()] }; }
