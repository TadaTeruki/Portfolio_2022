
function get_community_level(stx, sty, elevation){
    var nlv = get_noise_level(
                stx*global_config.community_dencity+128.0,
                sty*global_config.community_dencity+128.0,
                global_config.noise_quality_community,
                global_config.noise_persistence_community
            )
    return get_community_level_from_noise_level(nlv, elevation);
}

function get_community_level_from_noise_level(nlv, elevation) {

    if(elevation < 0.0) return 0.0

    var best_elv = 68/8000
    var fixed_nlv = nlv*(Math.pow(1.0-Math.abs(elevation-best_elv),40)*0.9+0.1)
    var base_cl = (fixed_nlv-(1.0-global_config.community_area_prop))/global_config.community_area_prop
    
    var best_cl = 1.0
    
    return Math.max(1.0-Math.abs(base_cl-best_cl), 0.0)
}