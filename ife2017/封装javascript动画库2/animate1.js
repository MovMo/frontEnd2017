//实现动画库（暂不使用promise）
var Animate = {
    init: function(el) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.queue = [];
        this.running = false;
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
        this.running = false;
        clearTimeout(this.timer);
        this.timer = null;
        return this;
    },
    play: function() {
        this.running = true;
        console.log('进入动画：' + this.running);
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
                //播放队列当中的下一组动画
                self.dequeue();
            } else {
                this.timer = setTimeout(step, 1000 / 50);
            }
        }
        this.timer = setTimeout(step, 1000 / 50);
    },
    enqueue: function(props, option) {
        this.queue.push(() => {
            this.initAnim.call(this, props, option);
            this.play.call(this, this.dequeue);
        });
        return this;
    },
    hasNext: function() {
        return this.queue.length > 0;
    },
    dequeue: function(props) {
        //console.log('length', this.queue.length);
        if (!this.running && this.hasNext()) {
            if (props) {
                for (var prop in props) {
                    console.log(prop + '出队成功');
                }
            }
            //console.log('length',this.queue.length);
            this.queue.shift().call(this);
        }
        return this;
    },
    runAnim: function(props, option) {
        this.enqueue(props, option);
        this.dequeue(props);
        //setTimeout(this.dequeue.bind(this), 0);
    }
};
