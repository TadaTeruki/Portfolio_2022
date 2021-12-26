
function make_el_curve_point(n,e) {
	var np = {}
	np.noise_level = n
	np.Elevation = e
	return np
}

var el_curve_list = [
	make_el_curve_point(0.0, -1.0),
	make_el_curve_point(0.5, -0.5),
	make_el_curve_point(0.63,-0.1),
	make_el_curve_point(0.7, 0.0),
	make_el_curve_point(1.0, 1.0),
];

function el_curve0(nlv){
	//ax = el_curve_list[0].noise_level
	var ay = el_curve_list[0].Elevation
	var bx = el_curve_list[1].noise_level
	var by = el_curve_list[1].Elevation
	return (1-Math.pow(nlv/bx,0.3))*(ay-by)+by
}

function el_curve1(nlv){
	var bx = el_curve_list[1].noise_level
	var by = el_curve_list[1].Elevation
	var cx = el_curve_list[2].noise_level
	var cy = el_curve_list[2].Elevation
	return -Math.pow((nlv-bx)/(cx-bx),2.7)*(by-cy)+by
}

function el_curve2(nlv){
	var cx = el_curve_list[2].noise_level
	var cy = el_curve_list[2].Elevation
	var dx = el_curve_list[3].noise_level
	var dy = el_curve_list[3].Elevation
	return Math.pow((nlv-dx)/(cx-dx),2.1)*(cy-dy)+dy
}

function el_curve3(nlv){
	var dx = el_curve_list[3].noise_level
	var dy = el_curve_list[3].Elevation
	//ex = el_curve_list[4].noise_level
	var ey = el_curve_list[4].Elevation
	return Math.pow((1-nlv)/(1-dx),0.12)*(dy-ey)+ey
}


function get_elevation_from_noise_level(nlv) {
	if(nlv < 0){ return 0.0 }
	if(nlv < el_curve_list[1].noise_level){ return el_curve0(nlv) }
	if(nlv < el_curve_list[2].noise_level){ return el_curve1(nlv) }
	if(nlv < el_curve_list[3].noise_level){ return el_curve2(nlv) }
	if(nlv < 1.0){ return el_curve3(nlv) }
	return 1.0
}