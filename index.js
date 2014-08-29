module.exports = function(count, type, max_radial_length, num_vertices) {
    switch (type) {
        case 'point':
            var features = [];
            for (var i = 0; i < count; i++) { features.push(feature(point())); }
            return collection(features);

        case 'polygon':    
        	if (typeof max_radial_length === 'undefined') max_radial_length = 0.5;
        	if (typeof num_vertices === 'undefined') num_vertices = 6;   

			var features = [];

			for (var i = 0; i < count; i++) {
				var vertices = [];

				// generate some random numbers
				var circle_offsets = Array.apply(null, new Array(parseInt(num_vertices))).map(Math.random);				

				// sum them in ascending order
				circle_offsets.forEach(function(cur, index, arr) {
					arr[index] = (index>0) ? cur + arr[index - 1] : cur;
				});				

				// lurch in a radial fashion
				circle_offsets.forEach(function(cur, index){										
					cur = cur * 2 * Math.PI / circle_offsets[circle_offsets.length - 1];

					var radial_scaler = Math.random();												
					vertices.push([
						radial_scaler * max_radial_length * Math.sin(cur),
						radial_scaler * max_radial_length * Math.cos(cur)
					]);				
				});

				// close the ring
				vertices.push(vertices[0]);

				// center the polygon around something				
				var hub = [lon(), lat()];				
				vertices = vertices.map(function(cur, index){
					return [cur[0] + hub[0], cur[1] + hub[1]];
				});

				features.push(feature(polygon([vertices])));
			}

			return collection(features);
    }
};

function rnd() { return Math.random() - 0.5; }
function lon() { return rnd() * 360; }
function lat() { return rnd() * 180; }

function point() { return { type: 'Point', coordinates: [lon(), lat()] }; }
function polygon(coordinates) { return { type: 'Polygon', coordinates: coordinates }; }

function feature(geom) {
    return { type: 'Feature', geometry: geom, properties: {} };
}
function collection(f) { return { type: 'FeatureCollection', features: f }; }
