
function scale_map(center_stx, center_sty, scale){
    var image = screen.ctx.getImageData(0, 0, screen.canvas.width, screen.canvas.height);
    var canvasInvisible=document.createElement('canvas');
    canvasInvisible.width=screen.canvas.width;
    canvasInvisible.height=screen.canvas.height;
    ctx2 = canvasInvisible.getContext('2d');
    ctx2.putImageData(image, 0, 0);
    var d_cx = x_standard_to_canvas(center_stx)*(scale-1.0)
    var d_cy = y_standard_to_canvas(center_sty)*(scale-1.0)
    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    screen.ctx.scale(1.0/scale, 1.0/scale);
    screen.ctx.drawImage(canvasInvisible, d_cx, d_cy);
    screen.ctx.scale(scale, scale);
    return
}

function draw_map(d_stx, d_sty, fill_all_pixel){
    var remain_scx = Math.round(x_standard_to_canvas(d_stx) - x_standard_to_canvas(0))
    var remain_scy = Math.round(y_standard_to_canvas(d_sty) - y_standard_to_canvas(0))
    
    var image = screen.ctx.getImageData(remain_scx, remain_scy, screen.canvas.width, screen.canvas.height);
    var data = image.data

    if(fill_all_pixel == true){
        for(var i = 0; i<data.length; i+=4){

            if(data[i+3] == 255)continue

            var color = {r:0, g:0, b:0}
            var iy = Math.floor((i/4)/image.width)
            var ix = Math.round((i/4)-iy*image.width)
            var istx = x_canvas_to_standard(ix)
            var isty = y_canvas_to_standard(iy)
            var elevation = get_elevation(istx, isty)

            
            /* terrain */{

                var terrain_color = get_color_from_elevation(elevation)

                var brightness; {
                    var shadow_direction_xy = Math.PI*0.25
                    var shade_elevation = get_elevation(istx+screen.config.shade_distance_st, isty+screen.config.shade_distance_st)
                    var dxt_xy = Math.atan((shade_elevation-elevation)*0.1/screen.config.shade_distance_st)
                    var dxt_xy_d = dxt_xy-shadow_direction_xy
                    var brightness_prop = (elevation >= 0.0) ? 0.3:0.05
                    brightness = dxt_xy_d/(Math.PI*0.5)*brightness_prop+(1.0-brightness_prop)
                }
                color.r = terrain_color.r*brightness
                color.g = terrain_color.g*brightness
                color.b = terrain_color.b*brightness

            }
            
            /*community*/
            if(elevation > 0.0) {
                
                var community_level = get_community_level(istx, isty, elevation)
                
                var community_color = get_color_from_community_level(community_level, screen.config.community_area_prop)
                var color_prop = community_color.a
                color.r = community_color.r*color_prop+color.r*(1.0-color_prop)
                color.g = community_color.g*color_prop+color.g*(1.0-color_prop)
                color.b = community_color.b*color_prop+color.b*(1.0-color_prop)
            }
            
            data[i+0]= color.r
            data[i+1]= color.g
            data[i+2]= color.b
            
            data[i+3]= 255
            
        }
    }

    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    screen.ctx.putImageData(image, 0, 0);

    return true

}

function shift_map(d_stx, d_sty){
    draw_map(d_stx, d_sty, true);
}

function init_map(){
    var image = screen.ctx.getImageData(0, 0, screen.canvas.width, screen.canvas.height);
    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    var succeed = draw_map(0, 0, true);
    if(succeed == false){
        screen.ctx.putImageData(image, 0, 0);
    }
}
