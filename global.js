
var screen = {}
var global_config = {}
var global_community_list_by_cell_id = {}

function set_screen(){
    global_config = {}
    global_config.map_init_process_wait_sec = 0.75
    
    global_config.zoom_scale = 1.02
    global_config.map_scale = 0.1
    global_config.community_area_prop = 0.7
    global_config.community_dencity = 30.0
    global_config.noise_quality_eleation = 12
    global_config.noise_quality_community = 3
    global_config.noise_persistence_eleation = 0.62
    global_config.noise_persistence_community = 0.5
    global_config.shade_distance_st = 0.0001
    global_config.community_mark_cell_st = 1.0/global_config.community_dencity
    global_config.community_mark_position_unit_scale = 0.2

    screen.canvas = document.getElementById("canvas_src");
    screen.ctx = screen.canvas.getContext("2d");
    screen.subcanvas = document.createElement("canvas");
    screen.subctx = screen.subcanvas.getContext("2d");

    screen.canvas.width = window.innerWidth;
    screen.canvas.height = window.innerHeight;
    screen.subcanvas.width = screen.canvas.width;
    screen.subcanvas.height = screen.canvas.height;
    screen.square_cwh = min(screen.subcanvas.width, screen.subcanvas.height);
    
    
    screen.square = {st_sx:0.0,
                     st_sy:0.0,
                     st_ex:global_config.map_scale,
                     st_ey:global_config.map_scale,
                     root_st_sx:0.0,
                     root_st_sy:0.0, 
                     root_st_ex:global_config.map_scale,
                     root_st_ey:global_config.map_scale
    }

    //global_config.noise_quality_community = 5
    screen.wait_count = 0
    screen.init_map_timeout = null
}
