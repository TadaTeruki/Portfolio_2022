


function drawPixel(screen, x, y, color) {
    
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);

    var index = 4 * (screen.canvas.width * roundedY + roundedX);

    screen.data[index + 0] = color.r;
    screen.data[index + 1] = color.g;
    screen.data[index + 2] = color.b;
    screen.data[index + 3] = color.a;
    
}

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

function get_noise_level(screen, x, y){
    var square = screen.square;
    var map_scale = screen.map_scale;
    return remove_fade(
        get_octave_noise(
            screen.cursor_sx+x/square*map_scale,
            screen.cursor_sy+y/square*map_scale,
            10, 0.55
        )
    );
}

function get_elevation(screen, x, y){
    return get_elevation_from_noise_level(get_noise_level(screen, x, y));
}

var v = 0

function get_brightness(screen, rx, ry){
    var shadow_direction_z = Math.PI*0.25
    var shadow_direction_xy = Math.PI*0.25
    var shadow_width = 1.415
    var x1 = rx+Math.cos(shadow_direction_z)*shadow_width
    var y1 = ry+Math.sin(shadow_direction_z)*shadow_width
    var x2 = rx-Math.cos(shadow_direction_z)*shadow_width
    var y2 = ry-Math.sin(shadow_direction_z)*shadow_width
    var elv1 = get_elevation(screen, x1, y1)*500
    var elv2 = get_elevation(screen, x2, y2)*500
    var elv_d = elv1-elv2
    var dst_d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))+0.0001
    var dxt_xy = Math.atan(elv_d/dst_d)
    var dxt_xy_d = dxt_xy-shadow_direction_xy
    
    return dxt_xy_d/(Math.PI*0.5)
}

function fix_num(m){
    return Math.floor(m*10000000)/10000000
}

function draw_map(screen, dcx, dcy){

    var nx = Math.ceil(screen.square*dcx/screen.map_scale);
    var ny = Math.ceil(screen.square*dcy/screen.map_scale);
    var image = screen.ctx.getImageData(nx, ny, screen.canvas.width, screen.canvas.height);
    var data = image.data

    
    for(var i = 0; i<data.length; i+=4){
        if(data[i+3]==0){
            var iy = Math.floor((i/4)/image.width)
            var ix = (i/4)-iy*image.width

            var elevation = get_elevation(screen, ix, iy)
            var color = get_color_from_elevation(elevation)
            var fb = get_brightness(screen, ix, iy)

            var shadow_strength = Math.abs(elevation)
            if(elevation >= 0.0){
                
            } else {
                fb = fb*0.3+0.7
                shadow_strength = shadow_strength*0.8+0.2
            }
            fb = fb*shadow_strength+(1.0-shadow_strength)
            
            data[i+0]= color.r*fb
            data[i+1]= color.g*fb
            data[i+2]= color.b*fb
            
            data[i+3]= 255
        }
    }
    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    screen.ctx.putImageData(image, 0, 0);
}

function min(a,b){
    if(a<b){
        return a
    }
    return b
}

function main(){
    var screen = {};
    screen.canvas = document.getElementById("canvas_src");
    screen.canvas.width = window.innerWidth;
    screen.canvas.height = window.innerHeight;
    screen.square = min(screen.canvas.width, screen.canvas.height);

    screen.ctx = screen.canvas.getContext("2d");
    screen.cursor_sx = 0.0
    screen.cursor_sy = 0.0
    screen.map_scale = 0.3

    noise.seed(3);

    draw_map(screen, 0, 0);

    var mouse_on = false
    var mouse_on_sx = 0.0
    var mouse_on_sy = 0.0

    screen.canvas.addEventListener('mousedown', e => {
        mouse_on_sx = x_screen_to_square(screen, e.x)
        mouse_on_sy = y_screen_to_square(screen, e.y)
        mouse_on = true;
    });

    screen.canvas.addEventListener('mouseup', e => {
        mouse_on = false;
        draw_map(screen, 0, 0);
    });

    screen.canvas.addEventListener('mouseout', e => {
        mouse_on = false;
    });


    screen.canvas.addEventListener('mousemove', e => {

        var event_sx = x_screen_to_square(screen, e.x);
        var event_sy = y_screen_to_square(screen, e.y);

        if(mouse_on == true){
            var dcx = fix_num((mouse_on_sx-event_sx)*screen.map_scale);
            var dcy = fix_num((mouse_on_sy-event_sy)*screen.map_scale);

            scroll_screen(e, screen, dcx, dcy);
            draw_map(screen, dcx, dcy);
        }
        

        
        //console.log(screen.cursor_sx, screen.cursor_sy)
        mouse_on_sx = event_sx;
        mouse_on_sy = event_sy;
    });
    
}