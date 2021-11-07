
$(document).ready(() => {
    
    let zoom_level = 1;
    let size = 8;
    let transtring = "scale(1) translate(0,calc(100vh - 77vw))";
    let isDown = false;
    let prev = { x: 0, y: 0 };
    let currpos = { x: 0, y: (100 * innerHeight - 77 * innerWidth) / 100 };

    let countries = [
        { name: "fra", x: 44, y: 56, zoom: 1 },
        { name: "spa", x: 37, y: 65, zoom: 1 },
        { name: "nem", x: 53, y: 47, zoom: 1 },
        { name: "pol", x: 63, y: 46, zoom: 1 },
        { name: "irs", x: 31.5, y: 44.5, zoom: 1.5 },
        { name: "por", x: 31.5, y: 66, zoom: 1.8 },
        { name: "ita", x: 55.5, y: 62, zoom: 1 },
        { name: "hol", x: 47.5, y: 46, zoom: 2.5 },
        { name: "bel", x: 46.5, y: 49, zoom: 2.5 },
        { name: "lux", x: 48.3, y: 50.8, zoom: 3 },
        { name: "ces", x: 58, y: 50.5, zoom: 2.2 },
        { name: "aus", x: 58, y: 54.3, zoom: 1.8 },
        { name: "slo", x: 58.7, y: 57, zoom: 3 },
        { name: "hrv", x: 61, y: 57.6, zoom: 2.5 },
        { name: "hun", x: 64, y: 55.3, zoom: 1.8 },
        { name: "slk", x: 63.8, y: 52.6, zoom: 2.5 },
        { name: "rum", x: 70, y: 57.6, zoom: 1.2 },
        { name: "bug", x: 70, y: 62.5, zoom: 1.8 },
        { name: "grk", x: 67, y: 68, zoom: 1.5 },
        { name: "mal", x: 58, y: 72, zoom: 3 },
        { name: "kip", x: 80, y: 73.5, zoom: 3 },
        { name: "lit", x: 69.5, y: 40.5, zoom: 2.2 },
        { name: "let", x: 71, y: 37.5, zoom: 2.2 },
        { name: "est", x: 71, y: 33.5, zoom: 2.2 },
        { name: "fin", x: 72, y: 25, zoom: 1 },
        { name: "sve", x: 63, y: 16, zoom: 1 },
        { name: "dan", x: 52, y: 39, zoom: 2.2 },
    ];
    const checkZoom = () => {
        countries.forEach(item => {
            if (!item.zoom || item.zoom > zoom_level) {
                $("#" + item.name).css("display", "none");
            }
            else {
                $("#" + item.name).css("display", "block");
            }
        })
    };
    const loadEventListeners = () => {
        $(".map-container").mousedown((e) => {
            isDown = true;
            prev = { x: e.clientX, y: e.clientY };
        }).mousemove((e) => {
            e.preventDefault();
            if (isDown) {
                let dx = prev.x - e.clientX;
                let dy = prev.y - e.clientY;
                currpos.x -= dx * 1 / zoom_level; currpos.y -= dy * 1 / zoom_level;
                if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                let h = innerWidth * 0.77;
                if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                // String Edit
                let n = transtring.indexOf("translate");
                let m = transtring.substring(n).lastIndexOf(")");
                transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                //
                $(".map").css("transform", transtring);
                prev = { x: e.clientX, y: e.clientY };
            }
        }).mousewheel((e) => {
            if(e.originalEvent.wheelDelta / 120 > 0) {
                if (zoom_level <= 3) {
                    zoom_level += 0.1;
                    // String Edit
                    let n = transtring.indexOf("scale");
                    let m = transtring.substring(n).indexOf(")");
                    transtring = transtring.replace(transtring.substring(n, n + m + 1), `scale(${zoom_level})`);
                    //
                    if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                    if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                    let h = innerWidth * 0.77;
                    if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                    if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                    // String Edit
                    n = transtring.indexOf("translate");
                    m = transtring.substring(n).lastIndexOf(")");
                    transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                    //
                    $(".map").css("transform", transtring);
                    $(".ball").css("transform", `scale(${1 / zoom_level})`);
                    $(".tt_con").css("transform", `scale(${1 / zoom_level})`);
                    checkZoom();
                }
            }
            else {
                if (zoom_level > 1) {
                    zoom_level -= 0.1;
                    if (zoom_level < 1) zoom_level = 1;
                    // String Edit
                    let n = transtring.indexOf("scale");
                    let m = transtring.substring(n).indexOf(")");
                    transtring = transtring.replace(transtring.substring(n, n + m + 1), `scale(${zoom_level})`);
                    //
                    if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                    if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                    let h = innerWidth * 0.77;
                    if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                    if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                    // String Edit
                    n = transtring.indexOf("translate");
                    m = transtring.substring(n).lastIndexOf(")");
                    transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                    //
                    $(".map").css("transform", transtring);
                    $(".ball").css("transform", `scale(${1 / zoom_level})`);
                    $(".tt_con").css("transform", `scale(${1 / zoom_level})`);
                    checkZoom();
                }
            }
        });
        $("#plus").click(() => {
            if (zoom_level <= 3) {
                zoom_level += 0.1;
                // String Edit
                let n = transtring.indexOf("scale");
                let m = transtring.substring(n).indexOf(")");
                transtring = transtring.replace(transtring.substring(n, n + m + 1), `scale(${zoom_level})`);
                //
                if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                let h = innerWidth * 0.77;
                if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                // String Edit
                n = transtring.indexOf("translate");
                m = transtring.substring(n).lastIndexOf(")");
                transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                //
                $(".map").css("transform", transtring);
                $(".ball").css("transform", `scale(${1 / zoom_level})`);
                $(".tt_con").css("transform", `scale(${1 / zoom_level})`);
                checkZoom();
            }
        });
        $("#minus").click(() => {
            if (zoom_level > 1) {
                zoom_level -= 0.1;
                if (zoom_level < 1) zoom_level = 1;
                // String Edit
                let n = transtring.indexOf("scale");
                let m = transtring.substring(n).indexOf(")");
                transtring = transtring.replace(transtring.substring(n, n + m + 1), `scale(${zoom_level})`);
                //
                if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                let h = innerWidth * 0.77;
                if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                // String Edit
                n = transtring.indexOf("translate");
                m = transtring.substring(n).lastIndexOf(")");
                transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                //
                $(".map").css("transform", transtring);
                $(".ball").css("transform", `scale(${1 / zoom_level})`);
                $(".tt_con").css("transform", `scale(${1 / zoom_level})`);
                checkZoom();
            }
        });
        $(".ball").hover(function () {
            $(this).css("transform", `scale(${1.2 / zoom_level})`);
        }, function () {
            $(this).css("transform", `scale(${1 / zoom_level})`);
        })
        $(window).mouseup(() => isDown = false);
        // MOBILE EVENTS
        let prevpinch = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        };
        let hypo = undefined;
        $(".map-container").touchstart((e) => {
            isDown = true;
            prev = { x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY };
            if (e.originalEvent.touches.length === 2) {
                let prevpinch = {
                    x1: e.originalEvent.touches[0].pageX,
                    y1: e.originalEvent.touches[0].pageY,
                    x2: e.originalEvent.touches[1].pageX,
                    y2: e.originalEvent.touches[1].pageY
                };
            }
        }).touchmove((e) => {
            e.preventDefault();
            if (e.originalEvent.touches.length === 1) {
                if (isDown) {
                    let dx = prev.x - e.originalEvent.touches[0].pageX;
                    let dy = prev.y - e.originalEvent.touches[0].pageY;
                    currpos.x -= dx * 1 / zoom_level; currpos.y -= dy * 1 / zoom_level;
                    if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                    if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                    let h = innerWidth * 0.77;
                    if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                    if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                    // String Edit
                    let n = transtring.indexOf("translate");
                    let m = transtring.substring(n).lastIndexOf(")");
                    transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                    //
                    $(".map").css("transform", transtring);
                    prev = { x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY };
                }
            }
            else if (e.originalEvent.touches.length === 2) {
                let hypo1 = Math.hypot((e.targetTouches[0].pageX - e.targetTouches[1].pageX), (e.targetTouches[0].pageY - e.targetTouches[1].pageY));
                if (hypo === undefined) {
                    hypo = hypo1;
                }
                if(hypo1 / hypo > 1) {
                    if (zoom_level <= 3) {
                        zoom_level += 0.1;
                        // String Edit
                        let n = transtring.indexOf("scale");
                        let m = transtring.substring(n).indexOf(")");
                        transtring = transtring.replace(transtring.substring(n, n + m + 1), `scale(${zoom_level})`);
                        //
                        if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                        if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                        let h = innerWidth * 0.77;
                        if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                        if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                        // String Edit
                        n = transtring.indexOf("translate");
                        m = transtring.substring(n).lastIndexOf(")");
                        transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                        //
                        $(".map").css("transform", transtring);
                        $(".ball").css("transform", `scale(${1 / zoom_level})`);
                        $(".tt_con").css("transform", `scale(${1 / zoom_level})`);
                        checkZoom();
                    }
                }
                else if( hypo1 / hypo < 1) {
                    if (zoom_level > 1) {
                        zoom_level -= 0.1;
                        if (zoom_level < 1) zoom_level = 1;
                        // String Edit
                        let n = transtring.indexOf("scale");
                        let m = transtring.substring(n).indexOf(")");
                        transtring = transtring.replace(transtring.substring(n, n + m + 1), `scale(${zoom_level})`);
                        //
                        if (currpos.x > innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                        if (currpos.x < -innerWidth * (zoom_level - 1) * 0.5 / zoom_level) currpos.x = -innerWidth * (zoom_level - 1) * 0.5 / zoom_level;
                        let h = innerWidth * 0.77;
                        if (currpos.y > innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                        if (currpos.y < (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level) currpos.y = (innerHeight - h) - innerHeight * (zoom_level - 1) * 0.5 / zoom_level;
                        // String Edit
                        n = transtring.indexOf("translate");
                        m = transtring.substring(n).lastIndexOf(")");
                        transtring = transtring.replace(transtring.substring(n, n + m + 1), `translate(${currpos.x}px,${currpos.y}px)`);
                        //
                        $(".map").css("transform", transtring);
                        $(".ball").css("transform", `scale(${1 / zoom_level})`);
                        $(".tt_con").css("transform", `scale(${1 / zoom_level})`);
                        checkZoom();
                    }
                }
            }
        })
        $(window).touchend(() => {
            isDown = false;
            hypo = undefined;
        });
    };

    countries.forEach(item => {
        let $new = $("<div></div>").addClass("ball");
        $new.attr("id", item.name);
        $new.css("background-image", "url(images/countryballs/" + item.name + "_neutral.png)");
        $new.css("top", (item.y - size / 2) + "vw");
        $new.css("left", (item.x - size / 2) + "vw");
        $(".map").append($new);
        let $new2 = $("<div></div>").addClass("tt_con");
        $new2.attr("id", "tt_" + item.name);
        $new2.css("top", (item.y - size / 2) + "vw");
        $new2.css("left", (item.x - size / 2) + "vw");
        $(".map").append($new2);
    });
    checkZoom();
    loadEventListeners();
});
