
function make_color_elevation(r, g, b, elevation){
	var tc = {}
	tc.r = r
	tc.g = g
	tc.b = b
	tc.elevation = elevation
	return tc
}

var elevation_list = [
	make_color_elevation(0.0, 0.3, 0.7, -8000.0/8000.0),
	make_color_elevation(0.2, 0.7, 0.9, -5000.0/8000.0),
	make_color_elevation(0.6, 0.8, 0.95, -1000.0/8000.0),
	make_color_elevation(1.0, 1.0, 1.0, -0.01/8000.0),
	make_color_elevation(0.8, 0.85, 0.45, 0.0/8000.0),
	make_color_elevation(0.88, 0.88, 0.4, 400.0/8000.0),
	make_color_elevation(0.95, 0.9, 0.5, 600.0/8000.0),
	make_color_elevation(0.85, 0.8, 0.4, 900.0/8000.0),
	make_color_elevation(0.6, 0.4, 0.1, 1400.0/8000.0),
	make_color_elevation(0.2, 0.1, 0.4, 1800.0/8000.0),
    make_color_elevation(1.0, 1.0, 1.0, 3000.0/8000.0),
    make_color_elevation(0.0, 0.0, 0.0, 8000.0/8000.0),
];

function get_color_from_elevation(elevation){
	var ch = elevation_list
	var adove_ch, below_ch = {}
	for (var i = 0; i<ch.length; i++){
		if(i == 0 || ch[i].elevation < elevation){
			below_ch = ch[i]
		} else {
			adove_ch = ch[i]
			break
		}
	}
	var target = {}
	var adove_prop = 0.0
	if(adove_ch.elevation-below_ch.elevation == 0){
		adove_prop = 0.0
	} else {
		adove_prop = 1.0-(adove_ch.elevation-elevation)/(adove_ch.elevation-below_ch.elevation)
	}

	target.r = 255*(adove_ch.r*adove_prop + below_ch.r*(1.0-adove_prop))
	target.g = 255*(adove_ch.g*adove_prop + below_ch.g*(1.0-adove_prop))
	target.b = 255*(adove_ch.b*adove_prop + below_ch.b*(1.0-adove_prop))
    target.a = 255
	return target
} 