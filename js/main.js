//-1:草地   0:一石块  1:酒桶  2:两石块  3:草堆  4:树  5:花丛
var step00 = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 4, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1], [-1, -1, -1, 4, -1, 5, 3, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];
var _wid, _hei, mouse = {
    x : 0,
    y : 0

}, movex = stagew >> 1, arrs, movey = stageh >> 1, dx = 10, dy = 10, mapcs, honorcs, objw, objh, x = 0, y = 0, z = 0, vx = 0, vy = 0, vz = 0, _count = 0, shake = 3000, lastime = 0, _canvas, _cs2d, isMouseDown = false, stagew = 64 * 20, _setval, flag = false, stageh = 64 * 11;
var bitmap, seti = 0, setj = 0;
var allpic = [];
function onKeyDownHandle(e) {
    // console.log(e.keyCode);
    switch(e.keyCode) {
    case 40:
        //bot
        movey += dy;
        seti++;
        if (seti > 2) {
            seti = 0;
        }
        setj = 0;
        break;
    case 38:
        //top
        movey -= dy;
        seti++;
        if (seti > 2) {
            seti = 0;
        }

        setj = 1;
        break;
    case 37:
        //left
        movex -= dx;
        seti++;
        if (seti > 2) {
            seti = 0;
        }

        setj = 2;
        break;
    case 39:
        //right;
        movex += dx;
        seti++;
        if (seti > 2) {
            seti = 0;
        }

        setj = 3;
        break;
    }

    movex < 0 ? movex = 0 : movex = movex;
    movex > stagew - 32 ? movex = stagew - 32 : movex = movex;
    movey < 0 ? movey = 0 : movey = movey;
    movey > stageh - 48 ? movey = stageh - 48 : movey = movey;

}

function onKeyUpHandle(e) {

}

function onMouseMoveHandle(e) {
    mouse.x = e.clientX, mouse.y = e.clientY;
}

function onMouseDownHandle(e) {
    // console.log('down')
    isMouseDown = true;
    return;
}

function onMouseUpHandle(e) {
    // console.log('up')
    isMouseDown = false;
    return;
}


function render() {
    // Class.createMap();
    // console.log(mouse.x + ' >> ' + mouse.y);
    var objx = $('#canvasbox').offset().left;
    var objy = $('#canvasbox').offset().top;
    var objw = $('#canvasbox').width();
    var objh = $('#canvasbox').height();

    if (mouse.x > objx && mouse.x < objx + objw) {

    } else {

    }
    if (mouse.y > objy && mouse.y < objy + objh) {

    } else {

    }

    // _cs2d.translate(movex, movey);
    // movex += dx;
    Class.drawHonor(movex, movey);
}


//layer
function fixedlayer(obj, _w, _h, _left, _top) {
    $(obj).css({
        width : _w,
        height : _h,
        left : _left,
        top : _top
    });
}

function movelayer(obj) {
    $(obj).css({
        left : $(document).scrollLeft() + _wid / 2,
        top : $(document).scrollTop() + _hei / 2
    });

}

function keyBox() {
    document.onkeydown = onKeyDownHandle;
    document.onkeyup = onKeyUpHandle;

    document.onmousemove = onMouseMoveHandle;
    document.onmousedown = onMouseDownHandle;
    document.onmouseup = onMouseUpHandle;
}

var Class = {
    create : function() {
        console.log('Class create');
    },
    init : function() {
        var element = document.createElement('div');
        $(document.body).append(element);
        $(element).attr('id', 'canvasbox');
        element.style.position = 'absolute';
        element.style.zIndex = 1;

        var _cs = document.createElement('canvas');
        $(_cs).attr('id', 'canvas'), _cs.width = stagew, _cs.height = stageh;
        element.appendChild(_cs);
        _cs2d = _cs.getContext('2d');

        //createmap
        mapcs = document.createElement('canvas');
        mapcs.width = 256, mapcs.height = 128;
        var map2d = mapcs.getContext('2d');

        honorcs = document.createElement('canvas');
        honorcs.width = 96, honorcs.height = 192;
        var honor2d = honorcs.getContext('2d');

        Fileloader.loadIMG('images/list.png', function(e) {
            map2d.drawImage(e.target, 0, 0, e.target.width, e.target.height);
            Class.createMap();
        });
        Fileloader.loadIMG('images/honor.png', function(e) {
            honor2d.drawImage(e.target, 0, 0, e.target.width, e.target.height);
            // honorarea2d.d
            movex = Math.floor(Math.random() * stagew - 32) + 32;
            movey = Math.floor(Math.random() * stageh - 48) + 48;
            Class.drawHonor(movex, movey);

            keyBox();
        });
        Class.addListener();
    },
    addListener : function() {
        $('#play').click(function() {

            if (flag) {
                flag = false;
                $(this).attr('value', 'play');
                clearInterval(_setval);
            } else {
                flag = true;
                $(this).attr('value', 'bause');
                _setval = setInterval('render()', 100);
            };

        });
        //resize
        $(window).resize('resize', Class.Size);
    },
    createMap : function() {
        var imgw = imgh = 64;
        var ilen = Math.floor(stagew / imgw);
        var jlen = Math.floor(stageh / imgh);
        var pp = arrs;
        for (var i = 0; i < jlen; i++) {
            for (var j = 0; j < ilen; j++) {
                //background
                _cs2d.drawImage(mapcs, imgw * 0, 0, imgw, imgw, imgw * j, i * imgw, imgw, imgw);
                if (pp[i][j] == 0) {
                    //small store
                    _cs2d.drawImage(mapcs, imgw * 1, 0, imgw, imgw, imgw * j, i * imgw, imgw, imgw);

                } else if (pp[i][j] == 2) {
                    //bit store
                    _cs2d.drawImage(mapcs, imgw * 2, 0, imgw, imgw, imgw * j, i * imgw, imgw, imgw);
                } else if (pp[i][j] == 3) {
                    //mow
                    _cs2d.drawImage(mapcs, imgw * 3, 0, imgw, imgw, imgw * j, i * imgw, imgw, imgw);
                } else if (pp[i][j] == 4) {
                    //tree
                    _cs2d.drawImage(mapcs, imgw * 0, imgw, imgw, imgw, imgw * j, i * imgw, imgw, imgw);
                } else if (pp[i][j] == 5) {
                    //flower
                    _cs2d.drawImage(mapcs, imgw * 1, imgw, imgw, imgw, imgw * j, i * imgw, imgw, imgw);
                } else if (pp[i][j] == 6) {
                    //flower
                    _cs2d.drawImage(mapcs, imgw * 2, imgw, imgw, imgw, imgw * j, i * imgw, imgw, imgw);
                }
            };
        };
    },
    drawHonor : function(x, y) {
        _cs2d.clearRect(0, 0, stagew, stageh);
        Class.createMap();
        _cs2d.drawImage(honorcs, 32 * seti, 48 * setj, 32, 48, x, y, 32, 48);
        // _cs2d.globalCompositeOperation = 'destination-over';
    },
    Size : function() {
        _wid = $(window).width(), hei = $(window).height();
    }
};
$(function() {
    _wid = $(window).width(), _hei = $(window).height();
    arrs = step00;
    Class.init();
    Class.Size();
});
