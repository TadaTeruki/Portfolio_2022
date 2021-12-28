
function x_event_to_canvas(ex){
    return ex-window.innerWidth*global_config.canvas_x_scale
}
function y_event_to_canvas(ey){
    return ey-window.innerHeight*global_config.canvas_y_scale
}

function set_square_root(){
    var p_square = screen.square
    p_square.root_st_sx = p_square.st_sx
    p_square.root_st_ex = p_square.st_ex
    p_square.root_st_sy = p_square.st_sy
    p_square.root_st_ey = p_square.st_ey
    screen.square = p_square
}

function start_scrolling(mouse_device, mouse_event){
    mouse_device.is_held = true
    mouse_device.root_stx = x_canvas_to_standard(x_event_to_canvas(mouse_event.x))
    mouse_device.root_sty = y_canvas_to_standard(y_event_to_canvas(mouse_event.y))
    set_square_root()
}

function end_scrolling(mouse_device, mouse_event){
    mouse_device.is_held = false
    set_square_root()

    //update_wait_count(screen)
    //set_map_init(screen)
}

function update_wait_count(){
    screen.wait_count++
    if(screen.wait_count == global_config.map_init_process_wait_sec*1000*2){
        screen.wait_count = 0
    }
}

function set_map_init(){
    var wait_count_now = screen.wait_count
    clearTimeout(screen.init_map_timeout)

    screen.init_map_timeout = setTimeout(function(){
        if(screen.wait_count == wait_count_now){
            init_map()
        }
    },global_config.map_init_process_wait_sec*1000)
}

function zoom_process(mouse_device, wheel_event){
    
    if ( mouse_device.is_held == true ) {
        return
    }

    update_wait_count()
    set_map_init()

    var scale = Math.pow(global_config.zoom_scale, wheel_event.deltaY);
    
    var p_square = screen.square
    var xw = p_square.st_ex-p_square.st_sx
    var yw = p_square.st_ey-p_square.st_sy
    var x_side_sum = (xw-xw*scale)
    var y_side_sum = (yw-yw*scale)
    var x_start_side_prop = (mouse_device.pos_stx-p_square.st_sx)/xw
    var y_start_side_prop = (mouse_device.pos_sty-p_square.st_sy)/yw

    set_square_root()
    p_square.st_sx = p_square.st_sx+x_side_sum*x_start_side_prop
    p_square.st_ex = p_square.st_ex-x_side_sum*(1.0-x_start_side_prop)
    p_square.st_sy = p_square.st_sy+y_side_sum*y_start_side_prop
    p_square.st_ey = p_square.st_ey-y_side_sum*(1.0-y_start_side_prop)
    screen.square = p_square

    scale_map(mouse_device.pos_stx, mouse_device.pos_sty, scale);
    shift_map(0, 0);

    
}


function scroll_process(mouse_device, mouse_event){
    
    mouse_device.pos_stx = x_canvas_to_standard(x_event_to_canvas(mouse_event.x))
    mouse_device.pos_sty = y_canvas_to_standard(y_event_to_canvas(mouse_event.y))

    if ( mouse_device.is_held == false ) {
        return
    }

    //update_wait_count()
    //set_map_init()

    var event_stx = x_canvas_to_standard(x_event_to_canvas(mouse_event.x))
    var event_sty = y_canvas_to_standard(y_event_to_canvas(mouse_event.y))

    var d_stx = mouse_device.root_stx-event_stx
    var d_sty = mouse_device.root_sty-event_sty
    
    var p_square = screen.square
    p_square.st_sx = p_square.st_sx+d_stx
    p_square.st_ex = p_square.st_ex+d_stx
    p_square.st_sy = p_square.st_sy+d_sty
    p_square.st_ey = p_square.st_ey+d_sty
    screen.square = p_square
    
    shift_map(d_stx, d_sty);

}

function auto_scroll_process(cx, cy){
    var d_stx = x_canvas_to_standard(cx) - x_canvas_to_standard(0)
    var d_sty = y_canvas_to_standard(cy) - y_canvas_to_standard(0)
    var p_square = screen.square
    p_square.st_sx = p_square.st_sx+d_stx
    p_square.st_ex = p_square.st_ex+d_stx
    p_square.st_sy = p_square.st_sy+d_sty
    p_square.st_ey = p_square.st_ey+d_sty
    screen.square = p_square
    shift_map(d_stx, d_sty);
}