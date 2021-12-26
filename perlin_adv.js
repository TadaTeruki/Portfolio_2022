function remove_fade(noise_oct){
    var t = noise_oct*0.5+0.5
    return t*t*t*(t*(t*6-15)+10); 
}

function get_octave_noise(x, y, octaves, persistence){
    var total = 0.0
    var freq = 1.0
    var amp = 1.0
    var maxval = 0.0
    for(var i = 0; i < octaves; i++){
        total += noise.simplex2(x*freq, y*freq)*amp
        maxval += amp
        amp *= persistence
        freq *= 2
    }
    return total/maxval
}

function get_noise_level(stx, sty, noise_quality, persistence){
    return remove_fade(
        get_octave_noise(
            stx, sty,
            noise_quality, persistence
        )
    );
}

function get_elevation(stx, sty){
    return get_elevation_from_noise_level(get_noise_level(stx, sty, global_config.noise_quality_eleation, global_config.noise_persistence_eleation));
}