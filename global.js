
var screen = {}
var global_community_list_by_cell_id = {}

function set_screen(){
    global_config.map_init_process_wait_sec = 0.75
    global_config.zoom_scale = 1.02
    global_config.map_scale = 0.05
    global_config.community_area_prop = 0.5
    global_config.community_dencity = 50.0
    global_config.noise_quality_eleation = 12
    global_config.noise_quality_community = 3
    global_config.noise_persistence_eleation = 0.62
    global_config.noise_persistence_community = 0.5
    global_config.shade_distance_st = 0.0001
    global_config.community_mark_cell_st = 1.0/global_config.community_dencity
    global_config.community_mark_position_unit_scale = 0.2
    global_config.canvas_x_scale = 1.0 - global_config.canvas_width_scale 
    global_config.canvas_y_scale = 0.0

    screen.canvas = document.getElementById("canvas_src");
    screen.ctx = screen.canvas.getContext("2d");
    screen.subcanvas = document.createElement("canvas");
    screen.subctx = screen.subcanvas.getContext("2d");
    screen.canvas.style.left = window.innerWidth*global_config.canvas_x_scale
    screen.canvas.style.top = window.innerHeight*global_config.canvas_y_scale
    screen.canvas.style.position = "fixed"
    screen.canvas.width = window.innerWidth*global_config.canvas_width_scale
    screen.canvas.height = window.innerHeight*global_config.canvas_height_scale
    screen.subcanvas.width = screen.canvas.width;
    screen.subcanvas.height = screen.canvas.height;
    screen.square_cwh = min(screen.subcanvas.width, screen.subcanvas.height);

    var docs = document.getElementById("document_src");
    docs.style.width = screen.canvas.style.left
    
    
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
