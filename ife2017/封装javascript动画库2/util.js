//获取元素属性
//元素属性都按照整数计算
var getStyle = function(dom, prop) {
    if (prop === 'opacity' && dom.style.filter) {
        return window.style.filter.match(/(\d+)/)[1];
    }
    var tmp = window.getComputedStyle ? window.getComputedStyle(dom, null)[prop] : dom.currentStyle[prop];
    return prop === 'opacity' ? parseFloat(tmp, 10) : parseInt(tmp, 10);
};
//设置元素属性
var setStyle = function(dom, prop, value) {
    if (prop === 'opacity') {
        dom.style.filter = '(opacity(' + parseFloat(value / 100) + '))';
        dom.style.opacity = value;
        return;
    }
    dom.style[prop] = parseInt(value, 10) + 'px';
};

//requestAnimationFrame的兼容处理
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

//时间戳获取的兼容处理
function nowtime() {
    if (typeof performance !== 'undefined' && performance.now) {
        return performance.now();
    }
    return Date.now ? Date.now() : (new Date()).getTime();
}
