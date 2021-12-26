
function scale_map(screen, center_stx, center_sty, scale){
    var image = screen.ctx.getImageData(0, 0, screen.canvas.width, screen.canvas.height);
    var canvasInvisible=document.createElement('canvas');
    canvasInvisible.width=screen.canvas.width;
    canvasInvisible.height=screen.canvas.height;
    ctx2 = canvasInvisible.getContext('2d');
    ctx2.putImageData(image, 0, 0);
    var d_cx = x_standard_to_canvas(screen, center_stx)*(scale-1.0)
    var d_cy = y_standard_to_canvas(screen, center_sty)*(scale-1.0)
    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    screen.ctx.scale(1.0/scale, 1.0/scale);
    screen.ctx.drawImage(canvasInvisible, d_cx, d_cy);
    screen.ctx.scale(scale, scale);
    return
}

function draw_map(screen, d_stx, d_sty, fill_all_pixel, interruption_is_available){
    var remain_scx = Math.round(x_standard_to_canvas(screen, d_stx) - x_standard_to_canvas(screen, 0))
    var remain_scy = Math.round(y_standard_to_canvas(screen, d_sty) - y_standard_to_canvas(screen, 0))
    
    var image = screen.ctx.getImageData(remain_scx, remain_scy, screen.canvas.width, screen.canvas.height);
    var data = image.data

    if(fill_all_pixel == true){
        for(var i = 0; i<data.length; i+=4){
            if(data[i+3]!=255){
                var iy = Math.floor((i/4)/image.width)
                var ix = Math.round((i/4)-iy*image.width)
                var istx = x_canvas_to_standard(screen, ix)
                var isty = y_canvas_to_standard(screen, iy)
                var elevation = get_elevation(screen, istx, isty)
                var color = get_color_from_elevation(elevation)

                var brightness; {
                    var shadow_direction_xy = Math.PI*0.25
                    var shade_elevation = get_elevation(screen, istx+screen.config.shade_distance_st, isty+screen.config.shade_distance_st)
                    var dxt_xy = Math.atan((shade_elevation-elevation)*0.1/screen.config.shade_distance_st)
                    var dxt_xy_d = dxt_xy-shadow_direction_xy
                    var brightness_prop = (elevation >= 0.0) ? 0.3:0.05
                    brightness = dxt_xy_d/(Math.PI*0.5)*brightness_prop+(1.0-brightness_prop)
                }
                
                data[i+0]= color.r*brightness
                data[i+1]= color.g*brightness
                data[i+2]= color.b*brightness
                
                data[i+3]= 255
            }
        }
    }

    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    screen.ctx.putImageData(image, 0, 0);

    return true

}

function shift_map(screen, d_stx, d_sty){
    draw_map(screen, d_stx, d_sty, true, false);
}

function init_map(screen){
    var image = screen.ctx.getImageData(0, 0, screen.canvas.width, screen.canvas.height);
    screen.ctx.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
    var succeed = draw_map(screen, 0, 0, true, true);
    if(succeed == false){
        screen.ctx.putImageData(image, 0, 0);
    }
}
