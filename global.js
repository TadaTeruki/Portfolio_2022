
var screen = {}
var global_config = {}
var global_community_list_by_cell_id = {}

function set_screen(){
    global_config.map_init_process_wait_sec = 0.75
    global_config.zoom_scale = 1.02
    global_config.map_scale = 0.2
    global_config.max_map_scale = 0.5
    global_config.min_map_scale = 0.05
    global_config.community_area_prop = 0.5
    global_config.community_dencity = 50.0
    global_config.noise_quality_eleation = 12
    global_config.noise_quality_community = 3
    global_config.noise_persistence_eleation = 0.62
    global_config.noise_persistence_community = 0.5
    global_config.shade_distance_st = 0.0001
    global_config.community_mark_cell_st = 1.0/global_config.community_dencity
    global_config.community_mark_position_unit_scale = 0.2
    global_config.community_is_available = false

    global_config.cloud_dencity = 5.0
    global_config.cloud_prop = 1.0
    global_config.cloud_width_scale = 1.5
    global_config.cloud_shadow_st = 0.005
    global_config.noise_quality_cloud = 8
    global_config.noise_persistence_cloud = 0.6
    global_config.min_acpect_scale = 0.3

    screen.canvas = document.getElementById("canvas_src");

    screen.docs = document.getElementById("document_src");
    screen.ctx = screen.canvas.getContext("2d");
    screen.subcanvas = document.createElement("canvas");
    screen.subctx = screen.subcanvas.getContext("2d");

    set_aspect()

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
