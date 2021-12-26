

function main(){
    var screen = {};
    screen.canvas = document.getElementById("canvas_src");
    screen.canvas.width = window.innerWidth;
    screen.canvas.height = window.innerHeight;
    screen.square_cwh = min(screen.canvas.width, screen.canvas.height);
    screen.ctx = screen.canvas.getContext("2d");
    var map_scale = 1.0
    screen.square = {st_sx:0.0, st_sy:0.0, st_ex:map_scale, st_ey:map_scale, root_st_sx:0.0, root_st_sy:0.0, root_st_ex:map_scale, root_st_ey:map_scale}
    screen.noise_quality = 12
    screen.wait_count = 0

    screen.config = {}
    screen.config.map_init_process_wait_sec = 0.75

    noise.seed(0);

    init_map(screen)

    var mouse_device = {}
    mouse_device.is_held = false
    mouse_device.root_stx = 0.0
    mouse_device.root_sty = 0.0
    mouse_device.pos_stx  = 0.0
    mouse_device.pos_sty  = 0.0

    screen.canvas.addEventListener('mousedown', event => { start_scrolling(mouse_device, screen, event) });

    screen.canvas.addEventListener('mouseup',  event => { end_scrolling(mouse_device, screen, event) });
    screen.canvas.addEventListener('mouseout', event => { end_scrolling(mouse_device, screen, event) });

    screen.canvas.addEventListener('wheel', event => {
        zoom_process(mouse_device, screen, event)
    });

    screen.canvas.addEventListener('mousemove', event => {
        scroll_process(mouse_device, screen, event)
    });

}