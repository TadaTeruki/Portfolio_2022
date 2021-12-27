
function make_color_elevation(r, g, b, elevation){
	var tc = {}
	tc.r = r
	tc.g = g
	tc.b = b
	tc.elevation = elevation
	return tc
}
/*
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
*/

var elevation_list = [
    make_color_elevation(0.05, 0.25, 0.3, -8000/8000.0),
    make_color_elevation(0.05, 0.3, 0.4, -500/8000.0),
	make_color_elevation(0.1, 0.4, 0.5, -0.0/8000.0),
	make_color_elevation(0.8, 0.85, 0.65, 0.0/8000.0),
    make_color_elevation(0.25, 0.5, 0.25, 20.0/8000.0),
    make_color_elevation(0.25, 0.5, 0.25, 8000.0/8000.0),
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

function get_color_from_community_level(community_level, community_area_prop){
	var target = {}
	var max_community_color ={r:152,g:154,b:128}// {r:100,g:130,b:70}//
	var min_community_color = {r:82,g:84,b:58}//{r:60,g:110,b:50}
	var prop = community_level
	
	target.r = (max_community_color.r*prop + min_community_color.r*(1.0-prop))
	target.g = (max_community_color.g*prop + min_community_color.g*(1.0-prop))
	target.b = (max_community_color.b*prop + min_community_color.b*(1.0-prop))

	target.a = 1.0-Math.pow(1.0-prop,10)
    
	return target
}