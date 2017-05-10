var Animate = {
    init: function(el) {
        this.dom = typeof el === 'string' ? document.querySelector(el) : el;
        // console.log(this.dom);
        this.queue = [];
        this.isRuning = false;
        this.reqId = null;
        this.toEnd = false;
    },
    initAnim: function(props, opts) {
        this.propchanges = {};
        this.duration = (opts && opts.duration) || 1000;
        this.easing = (opts && opts.easing) || tween.Linear;
        //为了实现reverse，需要initProps来记录变化之前的数值
        this.initprops = {};
        // 可以使用数组同时指定开始值和结束值，也可以仅仅指定结束值
        for (var prop in props) {
            this.propchanges[prop] = {};
            if (Array.isArray(props[prop])) {
                this.propchanges[prop]['from'] = this.initprops[prop] = props[prop][0];
                this.propchanges[prop]['to'] = props[prop][1];
            } else {
                this.propchanges[prop]['from'] = this.initprops[prop] = getStyle(this.dom, prop);
                this.propchanges[prop]['to'] = props[prop];
            }
        }
        return this;
    },
    stop: function() {
        this.isRuning = false;
        if (this.reqId) {
            cancelAnimationFrame(this.reqId);
            this.reqId = null;
        }
        return this;
    },
    play: function(opts) {
        console.log('opts', opts);
        this.isRuning = true;
        var self = this;
        var startTime;

        function tick(timestamp) {
            var curTime = timestamp || nowtime();
            if (!startTime) {
                startTime = curTime;
            }
            // console.log('passedTime', curTime - startTime);
            var passedTime = Math.min(curTime - startTime, self.duration);
            // 实现finish功能，直接到达动画最终状态
            if (self.toEnd) {
                passedTime = self.duration;
            }
            for (var prop in self.propchanges) {
                var curValue = self.easing(passedTime, self.propchanges[prop]['from'], self.propchanges[prop]['to'] - self.propchanges[prop]['from'], self.duration);
                console.log(prop + ':' + passedTime, curValue);
                setStyle(self.dom, prop, curValue);
            }
            if (passedTime >= self.duration) {
                //动画停止
                self.stop(); //在stop中将isRunning置为了false
                // startTime = 0;
                //下一个动画出队
                self.dequeue();
                if (opts.next) {
                    opts.next.call(null);
                }
            } else if (self.isRuning) {
                self.reqId = requestAnimationFrame(tick);
            }

            //必须将判断放在else里面
            //否则经过试验，链式调用时，除了第一个动画外，其他动画会出现问题
            //这是因为，虽然stop中将isRunning置为了false
            //但是接下来的dequeue执行play，又马上将isRunning置为了true
            // if (self.isRuning) {
            //     self.reqId = requestAnimationFrame(tick);
            // }
        }
        tick();
        return this;
    },
    // 如果当前有动画正在执行，那么动画队列的首个元素一定是'run'
    // 动画函数出队之后，开始执行前，立即在队列头部添加一个'run'元素，代表动画函数正在执行
    // 只有当对应动画函数执行完之后，才会调用出队操作，原队首的'run'元素才可以出队
    // 如果动画函数执行完毕，调用出队操作之后，动画队列中还有下一个动画函数，下一个动画函数出队后，执行之前，依旧将队列头部置为'run'，重复上述操作
    // 如果动画函数执行完毕，调用出队操作之后，动画队列中没有其他动画函数，那么队首的‘run’元素出队之后，队列为空
    // 首次入队时，动画队列的首个元素不是'run'，动画立即出队执行
    // 
    enqueue: function(fn) {
        this.queue.push(fn);
        if (this.queue[0] !== 'run') {
            this.dequeue();
        }
    },
    //上一个版本使用isRuning来控制出队执行的时机，这里运用队首的'run'来控制,isRunning的一一貌似不大
    dequeue: function() {
        while (this.queue.length) {
            var curItem = this.queue.shift();
            if (typeof curItem === 'function') {
                curItem.call(this); //这是个异步操作
                this.queue.unshift('run');
                break;
            }
        }
    },
    // 对外接口：开始动画的入口函数
    animate: function(props, opts) {
        // console.log(typeof this.queue);
        this.enqueue(() => {
            this.initAnim(props, opts);
            this.play(opts);
        });
        return this;
    },

    // 对外接口，直接到达动画的最终状态
    finish: function() {
        this.toEnd = true;
        return this;
    },
    // 对外接口：恢复到最初状态
    reverse: function() {
        if (!this.initprops) {
            alert('尚未调用任何动画，不能反转！');
        }
        this.animate(this.initprops);
        return this;
    },
    //
    runsequence: function(sequence) {
        let reSequence = sequence.reverse();
        reSequence.forEach((curItem, index) => {
            if (index >= 1) {
                prevItem = reSequence[index - 1];
                curItem.o.next = function() {
                    var anim = Object.create(Animate);
                    anim.init(prevItem.e);
                    anim.animate(prevItem.p, prevItem.o);
                };
            }
        });
        var firstItem = reSequence[reSequence.length - 1];
        var firstAnim = Object.create(Animate);
        firstAnim.init(firstItem.e);
        firstAnim.animate(firstItem.p, firstItem.o);
    },
};
