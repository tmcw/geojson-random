# geojson-random

Generate random GeoJSON features.

    npm install -g geojson-random
    geojson-random

## api

```js
var geojsonRandom = require('geojson-random');

geojsonRandom(100, 'point'); // featurecollection of 100 random points

geojsonRandom.pseudo(true); // use pseudorandom results
geojsonRandom.pseudo(false); // use Math.random results
```
