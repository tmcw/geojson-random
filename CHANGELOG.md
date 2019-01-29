# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.5.0"></a>
# [0.5.0](https://github.com/node-geojson/geojson-random/compare/v0.4.0...v0.5.0) (2019-01-29)


### Features

* Added bbox as command line argument. ([#19](https://github.com/node-geojson/geojson-random/issues/19)) ([d65f6bc](https://github.com/node-geojson/geojson-random/commit/d65f6bc))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/tmcw/geojson-random/compare/v0.3.0...v0.4.0) (2017-04-25)


### Features

* lineString, generates linestrings ([cc7f1e7](https://github.com/tmcw/geojson-random/commit/cc7f1e7)), closes [#13](https://github.com/tmcw/geojson-random/issues/13)



# 0.3.0

* Add pointStream method

# 0.2.2

* Fix `coordInBBBOX` function to fix the output of points within small bounding
  boxes.

# 1.0.0

* Total change to API: types are now separated into their own individual
  functions. Call `.polygon` and `.point` instead of specifying a type
  parameter.
* Add `geojsonRandom.position(bbox?)`
* Add optional `bbox` parameter to points.
