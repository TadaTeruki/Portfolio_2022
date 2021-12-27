

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