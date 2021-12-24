
function make_hcf_point(n,e) {
	var np = {}
	np.noise_level = n
	np.Elevation = e
	return np
}

var hcf_list = [
	make_hcf_point(0.0, -1.0),
	make_hcf_point(0.5, -0.5),
	make_hcf_point(0.63,-0.1),
	make_hcf_point(0.7, 0.0),
	make_hcf_point(1.0, 1.0),
];

function HCF0(nlv){
	//ax = hcf_list[0].noise_level
	var ay = hcf_list[0].Elevation
	var bx = hcf_list[1].noise_level
	var by = hcf_list[1].Elevation
	return (1-Math.pow(nlv/bx,0.3))*(ay-by)+by
}

function HCF1(nlv){
	var bx = hcf_list[1].noise_level
	var by = hcf_list[1].Elevation
	var cx = hcf_list[2].noise_level
	var cy = hcf_list[2].Elevation
	return -Math.pow((nlv-bx)/(cx-bx),2.7)*(by-cy)+by
}

function HCF2(nlv){
	var cx = hcf_list[2].noise_level
	var cy = hcf_list[2].Elevation
	var dx = hcf_list[3].noise_level
	var dy = hcf_list[3].Elevation
	return Math.pow((nlv-dx)/(cx-dx),2.1)*(cy-dy)+dy
}

function HCF3(nlv){
	var dx = hcf_list[3].noise_level
	var dy = hcf_list[3].Elevation
	//ex = hcf_list[4].noise_level
	var ey = hcf_list[4].Elevation
	return Math.pow((1-nlv)/(1-dx),0.12)*(dy-ey)+ey
}


function get_elevation_from_noise_level(nlv) {
	if(nlv < 0){ return 0.0 }
	if(nlv < hcf_list[1].noise_level){ return HCF0(nlv) }
	if(nlv < hcf_list[2].noise_level){ return HCF1(nlv) }
	if(nlv < hcf_list[3].noise_level){ return HCF2(nlv) }
	if(nlv < 1.0){ return HCF3(nlv) }
	return 1.0
}