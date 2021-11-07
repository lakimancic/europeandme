var sliderSpan = document.getElementById("slider-span");
var slider = document.getElementById("slider");
var slider2 = document.getElementById("slider2");
var sliderSpan2 = document.getElementById("slider-span2");
var slider3 = document.getElementById("slider3");
var sliderSpan3 = document.getElementById("slider-span3");
var slider4 = document.getElementById("slider4");
var sliderSpan4 = document.getElementById("slider-span4");

let zvuk_tacan = document.getElementById("zvuk_tacan");
let zvuk_netacan = document.getElementById("zvuk_netacan");
let zvuk_vreme = document.getElementById("zvuk_vreme");

let zvukSetts = JSON.parse(localStorage.zvukSetts);

sliderSpan.onmousedown = function (event1) {
    var sliderCoords = getCoords(slider);
    var sliderSpanCoords = getCoords(sliderSpan);
    var shift = event1.pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.onmousemove = function (event2) {
        //console.log("DA");
        var left =
            ((event2.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan.style.left = left + "%";
    };
    document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
    };
    return false;
};
sliderSpan.ontouchstart = function (event) {
    var sliderCoords = getCoords(slider);
    var sliderSpanCoords = getCoords(sliderSpan);
    var shift = event.targetTouches[0].pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.ontouchmove = function (event) {
        var left =
            ((event.targetTouches[0].pageX  - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan.style.left = left + "%";
    };
    document.ontouchend = function () {
        document.ontouchmove  = document.ontouchend = null;
    };
    return false;
};
///
sliderSpan2.onmousedown = function (event) {
    var sliderCoords = getCoords(slider2);
    var sliderSpanCoords = getCoords(sliderSpan2);
    var shift = event.pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.onmousemove = function (event) {
        var left =
            ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan2.style.left = left + "%";
    };
    document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
    };
    return false;
};
sliderSpan2.ontouchstart = function (event) {
    var sliderCoords = getCoords(slider2);
    var sliderSpanCoords = getCoords(sliderSpan2);
    var shift = event.targetTouches[0].pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.ontouchmove = function (event) {
        var left =
            ((event.targetTouches[0].pageX  - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan2.style.left = left + "%";
    };
    document.ontouchend = function () {
        document.ontouchmove  = document.ontouchend = null;
    };
    return false;
};
sliderSpan2.onmousedown = function (event) {
    var sliderCoords = getCoords(slider2);
    var sliderSpanCoords = getCoords(sliderSpan2);
    var shift = event.pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.onmousemove = function (event) {
        var left =
            ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan2.style.left = left + "%";
    };
    document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
    };
    return false;
};
////////////////////////////////////////////////
sliderSpan3.onmousedown = function (event1) {
    var sliderCoords = getCoords(slider3);
    var sliderSpanCoords = getCoords(sliderSpan3);
    var shift = event1.pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.onmousemove = function (event2) {
        //console.log("DA");
        var left =
            ((event2.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan3.style.left = left + "%";
    };
    document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
    };
    return false;
};
sliderSpan3.ontouchstart = function (event) {
    var sliderCoords = getCoords(slider3);
    var sliderSpanCoords = getCoords(sliderSpan3);
    var shift = event.targetTouches[0].pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.ontouchmove = function (event) {
        var left =
            ((event.targetTouches[0].pageX  - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan3.style.left = left + "%";
    };
    document.ontouchend = function () {
        document.ontouchmove  = document.ontouchend = null;
    };
    return false;
};
////////////////////////////////////////////////
sliderSpan4.onmousedown = function (event1) {
    var sliderCoords = getCoords(slider4);
    var sliderSpanCoords = getCoords(sliderSpan4);
    var shift = event1.pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.onmousemove = function (event2) {
        //console.log("DA");
        var left =
            ((event2.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan4.style.left = left + "%";
        zvuk_netacan.volume = left/100;
        zvuk_tacan.volume = left/100;
        zvuk_vreme.volume = left/100;
        zvukSetts.zvuk = left/100;
    };
    document.onmouseup = function () {
        if (typeof (Storage) !== "undefined") {
            localStorage.zvukSetts = JSON.stringify(zvukSetts);
        }
        document.onmousemove = document.onmouseup = null;
    };
    return false;
};
sliderSpan4.ontouchstart = function (event) {
    var sliderCoords = getCoords(slider4);
    var sliderSpanCoords = getCoords(sliderSpan4);
    var shift = event.targetTouches[0].pageX - sliderSpanCoords.left - sliderSpanCoords.width/2;

    document.ontouchmove = function (event) {
        var left =
            ((event.targetTouches[0].pageX  - shift - sliderCoords.left) / sliderCoords.width) * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        sliderSpan4.style.left = left + "%";
        zvuk_netacan.volume = left/100;
        zvuk_tacan.volume = left/100;
        zvuk_vreme.volume = left/100;
        zvukSetts.zvuk = left/100;
    };
    document.ontouchend = function () {
        if (typeof (Storage) !== "undefined") {
            localStorage.zvukSetts = JSON.stringify(zvukSetts);
        }
        document.ontouchmove  = document.ontouchend = null;
    };
    return false;
};
function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        width: box.right - box.left
    };
}
// $(() => {
//     $(sliderSpan).touchstart(function (event) {
//         var sliderCoords = getCoords(slider);
//         var sliderSpanCoords = getCoords(sliderSpan);
//         var shift = event.targetTouches[0].pageX - sliderSpanCoords.left;

//         $(document).touchmove(function (event) {
//             var left =
//                 ((event.targetTouches[0].pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
//             if (left < 0) left = 0;
//             if (left > 100) left = 100;
//             //sliderSpan.style.left = left + "%";
//             $(sliderSpan).css("left", left + "%");
//         });
//         $(document).touchend(function(event){
//             //document.onmousemove = document.onmouseup = null;
//             $(document).touchmove(() => { });
//             $(document).touchend(() => { });
//             return false;
//         });
//     });
// });
