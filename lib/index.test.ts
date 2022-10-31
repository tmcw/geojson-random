import * as geojsonRandom from "./";

test("random.position()", function () {
  var nobbox = geojsonRandom.position();
  expect(nobbox).toHaveLength(2);
  expect(nobbox[0] > -180 && nobbox[0] < 180).toBeTruthy();
  expect(nobbox[1] > -90 && nobbox[1] < 90).toBeTruthy();
});

test("random.position(bbox)", function () {
  const withBbox = geojsonRandom.position([0, 0, 10, 10]);
  expect(withBbox).toHaveLength(2);
  expect(withBbox[0] >= 0 && withBbox[0] <= 10).toBeTruthy();
  expect(withBbox[1] >= 0 && withBbox[1] <= 10).toBeTruthy();
});

test("random.point()", function () {
  var randomPoints = geojsonRandom.point(100);
  expect(randomPoints.features).toHaveLength(100);
  expect(randomPoints.features[0].geometry.type).toEqual("Point");
});

test("random.point(bbox)", function () {
  var randomPoints = geojsonRandom.point(1, [50, 50, 60, 60]);
  expect(randomPoints.features).toHaveLength(1);
  var withBbox = randomPoints.features[0].geometry.coordinates;
  expect(withBbox[0] >= 50 && withBbox[0] <= 60).toBeTruthy();
  expect(withBbox[1] >= 50 && withBbox[1] <= 60).toBeTruthy();
});

test("random.point(bbox zero width)", function () {
  var randomPoints = geojsonRandom.point(1, [50, 50, 50, 60]);
  expect(randomPoints.features).toHaveLength(1);
  var withBbox = randomPoints.features[0].geometry.coordinates;
  expect(withBbox[0]).toEqual(50);
});

test("random.polygon", function () {
  var randomPolygons = geojsonRandom.polygon(100);
  expect(randomPolygons.features).toHaveLength(100);
  expect(randomPolygons).toHaveProperty(
    ["features", 0, "geometry", "type"],
    "Polygon"
  );
  expect(randomPolygons.features[0].geometry.coordinates[0]).toHaveLength(11);

  var randomPolygonsHi = geojsonRandom.polygon(100, 20);
  expect(randomPolygonsHi.features[0].geometry.coordinates[0]).toHaveLength(21);
});

test("random.polygon with bbox", function () {
  var randomPolygonRing = geojsonRandom.polygon(1, 5, 5, [50, 50, 60, 60])
    .features[0].geometry.coordinates[0];

  randomPolygonRing.forEach(function (withBbox) {
    expect(withBbox[0] >= 40 && withBbox[0] <= 70).toBeTruthy();
    expect(withBbox[1] >= 40 && withBbox[1] <= 70).toBeTruthy();
  });
});
