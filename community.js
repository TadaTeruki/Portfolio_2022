
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
    
    var fixed_nlv = nlv*Math.pow(Math.abs(1.0-elevation),80)
    var base_cl = (fixed_nlv-(1.0-global_config.community_area_prop))/global_config.community_area_prop
    if(base_cl < 0.0 || elevation < 0.0) base_cl = 0.0
    
    return base_cl
}