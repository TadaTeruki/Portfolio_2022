function min(a,b){
    if(a<b){
        return a
    }
    return b
}

function x_canvas_to_standard(cx){
    return (cx-(screen.subcanvas.width-screen.square_cwh)*0.5)/screen.square_cwh*(screen.square.st_ex-screen.square.st_sx)+screen.square.st_sx;
}

function y_canvas_to_standard(cy){
    return (cy-(screen.subcanvas.height-screen.square_cwh)*0.5)/screen.square_cwh*(screen.square.st_ey-screen.square.st_sy)+screen.square.st_sy;
}

function x_standard_to_canvas(stx){
    return (stx-screen.square.st_sx)/(screen.square.st_ex-screen.square.st_sx)*screen.square_cwh+(screen.subcanvas.width-screen.square_cwh)*0.5
}

function y_standard_to_canvas(sty){
    return (sty-screen.square.st_sy)/(screen.square.st_ey-screen.square.st_sy)*screen.square_cwh+(screen.subcanvas.height-screen.square_cwh)*0.5
}