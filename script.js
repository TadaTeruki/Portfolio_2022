
var screen = {}

function set_screen(){
    screen.config = {}
    screen.config.map_init_process_wait_sec = 0.75
    
    screen.config.zoom_scale = 1.02
    screen.config.map_scale = 0.7
    screen.config.community_area_prop = 0.7
    screen.config.community_dencity = 20.0
    screen.config.noise_quality_eleation = 12
    screen.config.noise_quality_community = 1
    screen.config.noise_persistence_eleation = 0.62
    screen.config.noise_persistence_community = 0.8
    screen.config.shade_distance_st = 0.0001

    screen.canvas = document.getElementById("canvas_src");
    screen.canvas.width = window.innerWidth;
    screen.canvas.height = window.innerHeight;
    screen.square_cwh = min(screen.canvas.width, screen.canvas.height);
    screen.ctx = screen.canvas.getContext("2d");
    
    screen.square = {st_sx:0.0,
                     st_sy:0.0,
                     st_ex:screen.config.map_scale,
                     st_ey:screen.config.map_scale,
                     root_st_sx:0.0,
                     root_st_sy:0.0, 
                     root_st_ex:screen.config.map_scale,
                     root_st_ey:screen.config.map_scale
    }

    //screen.config.noise_quality_community = 5
    screen.wait_count = 0
    screen.init_map_timeout = null
}


function main(){

    noise.seed(0);

    

    set_screen()
    init_map()

    var mouse_device = {}
    mouse_device.is_held = false
    mouse_device.root_stx = 0.0
    mouse_device.root_sty = 0.0
    mouse_device.pos_stx  = 0.0
    mouse_device.pos_sty  = 0.0

    screen.canvas.addEventListener('mousedown', event => { start_scrolling(mouse_device, event) });

    screen.canvas.addEventListener('mouseup',  event => { end_scrolling(mouse_device, event) });
    screen.canvas.addEventListener('mouseout', event => { end_scrolling(mouse_device, event) });

    screen.canvas.addEventListener('wheel', event => {
        zoom_process(mouse_device, event)
    });

    screen.canvas.addEventListener('mousemove', event => {
        scroll_process(mouse_device, event)
    });

}