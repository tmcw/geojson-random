# geojson-random

[![CircleCI](https://circleci.com/gh/node-geojson/geojson-random.svg?style=svg)](https://circleci.com/gh/node-geojson/geojson-random)

Generate random [GeoJSON](http://geojson.org/) features.

Usable in [node.js](http://nodejs.org/) and in browsers with [browserify](http://browserify.org/).

    npm install -g geojson-random
    geojson-random

    # special fast-mode for points
    geojson-random 10000 point-stream

## api

```js
var random = require('geojson-random');
```

### `random.point(count, bbox)`

Return `count` points wrapped in a FeatureCollection.

An optional `bbox` parameter should be an array of numbers representing
a [bbox](http://geojson.org/geojson-spec.html#bounding-boxes) in WSEN order,
and if given, the point will reside within its bounds.

### `random.position(bbox?)`

Return a single GeoJSON [Position](http://geojson.org/geojson-spec.html#positions)
as a 2-element array of numbers in longitude, latitude order.

An optional `bbox` parameter should be an array of numbers representing
a [bbox](http://geojson.org/geojson-spec.html#bounding-boxes) in WSEN order,
and if given, the position will reside within its bounds.

### `random.polygon(count, num_vertices, max_radial_length, bbox)`

Return `count` polygons wrapped in a FeatureCollection.

* `num_vertices` is default `10` and is how many coordinates each Polygon
  will contain.
* `max_radial_length` is the maximum number of decimal degrees latitude
  or longitude that a vertex can reach out of the center of the Polygon.
  Default is `10`.
* `bbox` (Optional) Bounding box in [minX, minY, maxX, maxY] order.

### `random.lineString(count, num_vertices, max_length, max_rotation, bbox)`

Return `count` line strings wrapped in a FeatureCollection.

* `num_vertices` is default `10` and is how many coordinates each LineString
  will contain.
* `max_length` is the maximum number of decimal degrees that a vertex can be
  from its predecessor
  Default is `0.0001`.
* `max_rotation` is the maximum number of radians that a line segment can turn
  from the previous segment.
  Default is `Math.PI / 8`.
* `bbox` (Optional) Bounding box in [minX, minY, maxX, maxY] order. This
  parameter is only applied to the starting point of the line.
