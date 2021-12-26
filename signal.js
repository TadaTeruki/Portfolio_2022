
function set_square_root(screen){
    var p_square = screen.square
    p_square.root_st_sx = p_square.st_sx
    p_square.root_st_ex = p_square.st_ex
    p_square.root_st_sy = p_square.st_sy
    p_square.root_st_ey = p_square.st_ey
    screen.square = p_square
}

function start_scrolling(mouse_device, screen, mouse_event){
    mouse_device.is_held = true
    mouse_device.root_stx = x_canvas_to_standard(screen, mouse_event.x)
    mouse_device.root_sty = y_canvas_to_standard(screen, mouse_event.y)
    set_square_root(screen)
}

function end_scrolling(mouse_device, screen, mouse_event){
    mouse_device.is_held = false
    set_square_root(screen)

    update_wait_count(screen)
    set_map_init(screen)
}

function update_wait_count(screen){
    screen.wait_count++
    if(screen.wait_count == screen.config.map_init_process_wait_sec*1000*2){
        screen.wait_count = 0
    }
}

function set_map_init(screen){
    var wait_count_now = screen.wait_count
    setTimeout(function(){
        if(screen.wait_count == wait_count_now){
            init_map(screen)
        }
    },screen.config.map_init_process_wait_sec*1000)
}

function zoom_process(mouse_device, screen, wheel_event){
    if ( mouse_device.is_held == true ) {
        return
    }
    update_wait_count(screen)

    var scale = Math.pow(1.05, wheel_event.deltaY);
    
    var p_square = screen.square
    var xw = p_square.st_ex-p_square.st_sx
    var yw = p_square.st_ey-p_square.st_sy
    var x_side_sum = (xw-xw*scale)
    var y_side_sum = (yw-yw*scale)
    var x_start_side_prop = (mouse_device.pos_stx-p_square.st_sx)/xw
    var y_start_side_prop = (mouse_device.pos_sty-p_square.st_sy)/yw

    set_square_root(screen)
    p_square.st_sx = p_square.st_sx+x_side_sum*x_start_side_prop
    p_square.st_ex = p_square.st_ex-x_side_sum*(1.0-x_start_side_prop)
    p_square.st_sy = p_square.st_sy+y_side_sum*y_start_side_prop
    p_square.st_ey = p_square.st_ey-y_side_sum*(1.0-y_start_side_prop)
    screen.square = p_square

    scale_map(screen, mouse_device.pos_stx, mouse_device.pos_sty, scale);
    draw_map(screen, 0, 0, true);

    set_map_init(screen)
}


function scroll_process(mouse_device, screen, mouse_event){
    
    mouse_device.pos_stx = x_canvas_to_standard(screen, mouse_event.x)
    mouse_device.pos_sty = y_canvas_to_standard(screen, mouse_event.y)

    if ( mouse_device.is_held == false ) {
        return
    }
    var event_stx = x_canvas_to_standard(screen, mouse_event.x)
    var event_sty = y_canvas_to_standard(screen, mouse_event.y)

    var d_stx = mouse_device.root_stx-event_stx
    var d_sty = mouse_device.root_sty-event_sty
    
    var p_square = screen.square
    p_square.st_sx = p_square.st_sx+d_stx
    p_square.st_ex = p_square.st_ex+d_stx
    p_square.st_sy = p_square.st_sy+d_sty
    p_square.st_ey = p_square.st_ey+d_sty
    screen.square = p_square
    
    draw_map(screen, d_stx, d_sty, true);

}