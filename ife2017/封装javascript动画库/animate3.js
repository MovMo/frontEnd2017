//实现动画库
//1.使用requestAnimationFrame
//2.引入promise
var Animate = {
    init: function(el) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.reqId = null;
        return this;
    },
    initAnim: function(props, option) {
        this.propChange = {};
        this.duration = (option && option.duration) || 1000;
        this.easing = (option && option.easing) || tween.Linear;
        for (var prop in props) {
            this.propChange[prop] = {};
            this.propChange[prop]['to'] = props[prop];
            this.propChange[prop]['from'] = getStyle(this.el, prop);
        }
        return this;
    },
    stop: function() {
        if (this.reqId) {
            cancelAnimationFrame(this.reqId);
        }
        this.reqId = null;
        return this;
    },
    play: function() {
        console.log('进入动画：');
        var startTime = 0;
        var self = this;
        if (this.reqId) {
            this.stop();
        }
        return new Promise((resolve, reject) => {
            function step(timestamp) {
                if (!startTime) {
                    startTime = timestamp;
                }
                var passedTime = Math.min(timestamp - startTime, self.duration);
                console.log('passedTime:' + passedTime + ',duration:' + self.duration);
                for (var prop in self.propChange) {
                    var target = self.easing(passedTime, self.propChange[prop]['from'], self.propChange[prop]['to'] - self.propChange[prop]['from'], self.duration);
                    setStyle(self.el, prop, target);
                }
                if (passedTime >= self.duration) {
                    self.stop();
                    resolve();
                } else {
                    this.reqId = requestAnimationFrame(step);
                }
            }
            this.reqId = requestAnimationFrame(step);
            this.cancel = function() {
                self.stop();
                reject('cancel');
            };
        });

    },
    runAnim: function(props, option) {
        this.initAnim(props, option);
        return this.play();
    }
};
