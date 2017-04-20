//实现动画库（暂不使用promise）
var Animate = {
    init: function(el) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.timer = null;
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
        clearTimeout(this.timer);
        this.timer = null;
        return this;
    },
    play: function(callback) {
        var startTime = 0;
        var self = this;
        if (this.timer) {
            this.stop();
        }

        function step() {
            if (!startTime) {
                startTime = nowtime();
            }
            var passedTime = Math.min(nowtime() - startTime, self.duration);
            console.log('passedTime:' + passedTime + ',duration:' + self.duration);
            for (var prop in self.propChange) {
                var target = self.easing(passedTime, self.propChange[prop]['from'], self.propChange[prop]['to'] - self.propChange[prop]['from'], self.duration);
                setStyle(self.el, prop, target);
            }
            if (passedTime >= self.duration) {
                self.stop();
                if (callback) {
                    callback.call(self);
                }
            } else {
                this.timer = setTimeout(step, 1000 / 50);
            }
        }
        this.timer = setTimeout(step, 1000 / 50);
    },
    runAnim: function(props, option, callback) {
        this.initAnim(props, option);
        this.play(callback);
    }
};
