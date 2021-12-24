

function x_screen_to_square(screen, x){
    return (x-(screen.canvas.width-screen.square)/2)/screen.square
}
function y_screen_to_square(screen, y){
    return (y-(screen.canvas.height-screen.square)/2)/screen.square
}


function scroll_screen(event, screen, dsx, dsy){
    //event.x = 0;
    //var event_sx = x_screen_to_square(screen, event.x)
    //var event_sy = y_screen_to_square(screen, event.y)
    screen.cursor_sx += dsx
    screen.cursor_sy += dsy

    //console.log(event_sx, event_sy)
}