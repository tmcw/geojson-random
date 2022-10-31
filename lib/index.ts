import {
  Feature,
  Point,
  Geometry,
  FeatureCollection,
  LineString,
} from "geojson";

type Position2 = [number, number];
type BBox4 = [number, number, number, number];

export function position(bbox: BBox4): Position2 {
  if (bbox) return coordInBBBOX(bbox);
  else return [lon(), lat()];
}

export function point(count: number, bbox: BBox4): FeatureCollection {
  const features = [];
  for (let i = 0; i < count; i++) {
    features.push(feature(bbox ? makePoint(position(bbox)) : makePoint()));
  }
  return {
    type: "FeatureCollection",
    features,
  };
}

export function polygon(
  count: number,
  num_vertices: number = 10,
  max_radial_length: number = 10,
  bbox: undefined | BBox4 = undefined
) {
  const features = [];
  for (let i = 0; i < count; i++) {
    let vertices: Position2[] = [];
    const circle_offsets = Array.apply(null, new Array(num_vertices + 1)).map(
      Math.random
    );

    circle_offsets.forEach(function sumOffsets(cur, index, arr) {
      arr[index] = index > 0 ? cur + arr[index - 1] : cur;
    });
    circle_offsets.forEach(function scaleOffsets(cur) {
      cur = (cur * 2 * Math.PI) / circle_offsets[circle_offsets.length - 1];
      const radial_scaler = Math.random();
      vertices.push([
        radial_scaler * max_radial_length * Math.sin(cur),
        radial_scaler * max_radial_length * Math.cos(cur),
      ]);
    });
    vertices[vertices.length - 1] = vertices[0]; // close the ring

    // center the polygon around something
    vertices = vertices.map(vertexToCoordinate(position(bbox)));
    features.push(
      feature({
        type: "Polygon",
        coordinates: [vertices],
      })
    );
  }

  return {
    type: "FeatureCollection",
    features,
  };
}

export function lineString(
  count: number,
  num_vertices: number,
  max_length: number,
  max_rotation: number,
  bbox: BBox4
): FeatureCollection<LineString> {
  if (typeof num_vertices !== "number" || num_vertices < 2) num_vertices = 10;
  if (typeof max_length !== "number") max_length = 0.0001;
  if (typeof max_rotation !== "number") max_rotation = Math.PI / 8;

  const features: Feature<LineString>[] = [];
  for (let i = 0; i < count; i++) {
    const startingPoint = position(bbox);
    const vertices = [startingPoint];
    for (let j = 0; j < num_vertices - 1; j++) {
      const priorAngle =
        j === 0
          ? Math.random() * 2 * Math.PI
          : Math.tan(
              (vertices[j][1] - vertices[j - 1][1]) /
                (vertices[j][0] - vertices[j - 1][0])
            );
      const angle = priorAngle + (Math.random() - 0.5) * max_rotation * 2;
      const distance = Math.random() * max_length;
      vertices.push([
        vertices[j][0] + distance * Math.cos(angle),
        vertices[j][1] + distance * Math.sin(angle),
      ]);
    }
    features.push({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: vertices,
      },
    });
  }

  return {
    type: "FeatureCollection",
    features,
  };
}

function vertexToCoordinate(hub: Position2) {
  return function (cur: Position2): Position2 {
    return [cur[0] + hub[0], cur[1] + hub[1]];
  };
}

function rnd() {
  return Math.random() - 0.5;
}
function lon() {
  return rnd() * 360;
}
function lat() {
  return rnd() * 180;
}

function makePoint(coordinates?: Position2): Point {
  return {
    type: "Point",
    coordinates: coordinates || [lon(), lat()],
  };
}

function coordInBBBOX(bbox: BBox4): Position2 {
  return [
    Math.random() * (bbox[2] - bbox[0]) + bbox[0],
    Math.random() * (bbox[3] - bbox[1]) + bbox[1],
  ];
}

function feature(geom: Geometry): Feature {
  return {
    type: "Feature",
    geometry: geom,
    properties: {},
  };
}
