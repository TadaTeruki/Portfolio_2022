
function scale_map(center_stx, center_sty, scale){
    var image = screen.subctx.getImageData(0, 0, screen.subcanvas.width, screen.subcanvas.height);
    var canvasInvisible=document.createElement("canvas");
    canvasInvisible.width=screen.subcanvas.width;
    canvasInvisible.height=screen.subcanvas.height;
    ctx2 = canvasInvisible.getContext("2d");
    ctx2.putImageData(image, 0, 0);
    var d_cx = x_standard_to_canvas(center_stx)*(scale-1.0)
    var d_cy = y_standard_to_canvas(center_sty)*(scale-1.0)
    screen.subctx.clearRect(0, 0, screen.subcanvas.width, screen.subcanvas.height);
    screen.subctx.scale(1.0/scale, 1.0/scale);
    screen.subctx.drawImage(canvasInvisible, d_cx, d_cy);
    screen.subctx.scale(scale, scale);
}

function display_map(){
    var image = screen.subctx.getImageData(0, 0, screen.subcanvas.width, screen.subcanvas.height);
    screen.ctx.putImageData(image, 0, 0);
}


function get_mark_cell_id(stx, sty, mark_cell_st){
    var r_x = Math.floor(stx/mark_cell_st)
    var r_y = Math.floor(sty/mark_cell_st)
    return {
        x:r_x,
        y:r_y,
    }
}

function direct_get_community_level(stx, sty){
    return get_community_level(stx, sty, get_elevation(stx, sty))
}

function get_community_mark_from_cell_id(id_x, id_y, mark_cell_st, unit_scale){

    var s_stx = id_x*mark_cell_st
    var e_stx = (id_x+1)*mark_cell_st
    var s_sty = id_y*mark_cell_st
    var e_sty = (id_y+1)*mark_cell_st

    var check_st_x = (e_stx-s_stx)*unit_scale
    var check_st_y = (e_sty-s_sty)*unit_scale

    var max_community_level = 0.0
    var r_stx = 0.0
    var r_sty = 0.0
    var first = true
    var available = false
    
    for(var sty = s_sty+check_st_y*0.5; sty < e_sty; sty += check_st_y){
        for(var stx = s_stx+check_st_x*0.5; stx < e_stx; stx += check_st_x){
            var community_level = direct_get_community_level(stx, sty)
            if(community_level != 0.0 && (first || max_community_level < community_level)){
                max_community_level = community_level
                r_stx = stx
                r_sty = sty
                first = false
                available = true
            }
        }
    }

    return {
        available: available,
        stx: r_stx,
        sty: r_sty,
    }
}

function draw_map(d_stx, d_sty, fill_all_pixel){
    var remain_scx = Math.round(x_standard_to_canvas(d_stx) - x_standard_to_canvas(0))
    var remain_scy = Math.round(y_standard_to_canvas(d_sty) - y_standard_to_canvas(0))

    var image = screen.subctx.getImageData(remain_scx, remain_scy, screen.subcanvas.width, screen.subcanvas.height);
    var data = image.data
    var nw_cell_id, se_cell_id//get_mark_cell_id(istx, isty, 0.1)
    //var community_list_by_cell_id = {} // {max_community_level, stx, sty}
    

    if(fill_all_pixel == true){
        for(var i = 0; i<data.length; i+=4){

            var color = {r:0, g:0, b:0}
            var iy = Math.floor((i/4)/image.width)
            var ix = Math.round((i/4)-iy*image.width)
            var istx = x_canvas_to_standard(ix)
            var isty = y_canvas_to_standard(iy)

            if(i == 0) nw_cell_id = get_mark_cell_id(istx, isty, global_config.community_mark_cell_st)
            if(i+4 >= data.length) se_cell_id = get_mark_cell_id(istx, isty, global_config.community_mark_cell_st)

            if(data[i+3] == 255)continue

            var elevation = get_elevation(istx, isty)

            /* terrain */{

                var terrain_color = get_color_from_elevation(elevation)

                var brightness; {
                    var shadow_direction_xy = Math.PI*0.25
                    var shade_elevation = get_elevation(istx+global_config.shade_distance_st, isty+global_config.shade_distance_st)
                    var dxt_xy = Math.atan((shade_elevation-elevation)*0.1/global_config.shade_distance_st)
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
                
                var community_color = get_color_from_community_level(community_level,
                                        global_config.community_area_prop, global_config.community_mark_position_unit_scale)
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

    screen.subctx.clearRect(0, 0, screen.subcanvas.width, screen.subcanvas.height)
    screen.subctx.putImageData(image, 0, 0)

    display_map()

    return

    /*community_mark*/
    for(var id_y = nw_cell_id.y; id_y <= se_cell_id.y; id_y += 1){
        for(var id_x = nw_cell_id.x; id_x <= se_cell_id.x; id_x += 1){
            if(id_y in global_community_list_by_cell_id == false){
                global_community_list_by_cell_id[id_y] = {}
            }
            if(id_x in global_community_list_by_cell_id[id_y] == false){
                global_community_list_by_cell_id[id_y][id_x] = get_community_mark_from_cell_id(id_x, id_y, global_config.community_mark_cell_st, global_config.community_mark_position_unit_scale)
            }
            var community_mark = global_community_list_by_cell_id[id_y][id_x]
            screen.ctx.beginPath();
            screen.ctx.arc(x_standard_to_canvas(community_mark.stx), y_standard_to_canvas(community_mark.sty), 5, 0, Math.PI*2, false)
            screen.ctx.fill()
        }
    } 
}

function shift_map(d_stx, d_sty){
    draw_map(d_stx, d_sty, true);
}

function init_map(){
    global_community_list_by_cell_id = {}
    screen.subctx.clearRect(0, 0, screen.subcanvas.width, screen.subcanvas.height);
    draw_map(0, 0, true);
}
