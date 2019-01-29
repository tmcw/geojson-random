const from = require("from2");

module.exports = function() {
  throw new Error("call .point(), .lineString(), or .polygon() instead");
};

function position(bbox) {
  if (bbox) return coordInBBBOX(bbox);
  else return [lon(), lat()];
}

module.exports.position = position;

module.exports.point = function(count, bbox) {
  const features = [];
  for (let i = 0; i < count; i++) {
    features.push(feature(bbox ? point(position(bbox)) : point()));
  }
  return collection(features);
};

module.exports.pointStream = function(count, bbox) {
  return from.obj(function(size, next) {
    if (--count) {
      next(null, feature(bbox ? point(position(bbox)) : point()));
    } else {
      next(null, null);
    }
  });
};

module.exports.polygon = function(
  count,
  num_vertices,
  max_radial_length,
  bbox
) {
  if (typeof num_vertices !== "number") num_vertices = 10;
  if (typeof max_radial_length !== "number") max_radial_length = 10;
  const features = [];
  for (let i = 0; i < count; i++) {
    let vertices = [];
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
        radial_scaler * max_radial_length * Math.cos(cur)
      ]);
    });
    vertices[vertices.length - 1] = vertices[0]; // close the ring

    // center the polygon around something
    vertices = vertices.map(vertexToCoordinate(position(bbox)));
    features.push(feature(polygon([vertices])));
  }

  return collection(features);
};

module.exports.lineString = function(
  count,
  num_vertices,
  max_length,
  max_rotation,
  bbox
) {
  if (typeof num_vertices !== "number" || num_vertices < 2) num_vertices = 10;
  if (typeof max_length !== "number") max_length = 0.0001;
  if (typeof max_rotation !== "number") max_rotation = Math.PI / 8;

  const features = [];
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
        vertices[j][1] + distance * Math.sin(angle)
      ]);
    }
    features.push(feature(lineString(vertices)));
  }

  return collection(features);
};

function vertexToCoordinate(hub) {
  return function(cur) {
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

function point(coordinates) {
  return {
    type: "Point",
    coordinates: coordinates || [lon(), lat()]
  };
}

function coordInBBBOX(bbox) {
  return [
    Math.random() * (bbox[2] - bbox[0]) + bbox[0],
    Math.random() * (bbox[3] - bbox[1]) + bbox[1]
  ];
}

function polygon(coordinates) {
  return {
    type: "Polygon",
    coordinates: coordinates
  };
}

function feature(geom) {
  return {
    type: "Feature",
    geometry: geom,
    properties: {}
  };
}

function collection(f) {
  return {
    type: "FeatureCollection",
    features: f
  };
}

function lineString(coordinates) {
  return {
    type: "LineString",
    coordinates: coordinates
  };
}
