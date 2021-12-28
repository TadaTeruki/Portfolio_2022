

function init(){
    set_screen()
    setTimeout(function(){
        main()
    },100)
}

function main(){

    noise.seed(6);

    init_map()

    var mouse_device = {}
    mouse_device.is_held = false
    mouse_device.root_stx = 0.0
    mouse_device.root_sty = 0.0
    mouse_device.pos_stx  = 0.0
    mouse_device.pos_sty  = 0.0

    var auto_scroll = {}
    auto_scroll.interval = 70
    auto_scroll.max_wait = 0
    auto_scroll.max_speed_st = 1.0
    var auto_scroll_speed_st = 0.0
    var auto_scroll_wait = 0
    var auto_scroll_enabled = true

    setInterval(function(){
        if(auto_scroll_enabled == false)return

        if(auto_scroll_wait > 0){
            auto_scroll_wait--
            auto_scroll_speed_st = 0.0
        } else {
            auto_scroll_speed_st = Math.min(auto_scroll.max_speed_st, auto_scroll_speed_st+auto_scroll.max_speed_st/10.0)
            auto_scroll_process(auto_scroll_speed_st, 0)
        }
    }, auto_scroll.interval)
    

    screen.canvas.addEventListener('mousedown', event => { start_scrolling(mouse_device, event) });

    screen.canvas.addEventListener('mouseup',  event => { end_scrolling(mouse_device, event) });
    screen.canvas.addEventListener('mouseover', event => {});
    screen.canvas.addEventListener('mouseout', event => {
        end_scrolling(mouse_device, event)
        auto_scroll_enabled = true
        auto_scroll_wait = auto_scroll.max_wait
    });
    screen.canvas.addEventListener('wheel', event => {
        event.preventDefault();
        zoom_process(mouse_device, event)
        auto_scroll_enabled = false
    });
    screen.docs.addEventListener('wheel', event => {
        auto_scroll_process(0.0, 1.0*(event.deltaY < 0 ? -1.0:1.0))
    });
    screen.canvas.addEventListener('mousemove', event => {
        scroll_process(mouse_device, event)
        if( mouse_device.is_held == true ){
            auto_scroll_enabled = false
        }
    });

    

}