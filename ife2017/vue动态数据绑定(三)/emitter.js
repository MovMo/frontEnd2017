//发布-订阅对象（事件模式）
var Emitter = {
    init: function(ctx) {
        this._ctx = ctx || this;
        return this;
    },
    on: function(type, fn) {
        this._cbs = this._cbs || {};         
        (this._cbs[type] || (this._cbs[type] = [])).push(fn);
        return this;
    },
    off: function(type, fn) {
        this._cbs = this._cbs || {};
        if (!arguments.length) {
            this._cbs = {};
            return this;
        }
        fns = this._cbs[type];
        if (!fns) {
            return this;
        }
        if (arguments.length === 1) {
            delete this._cbs[type];
            return this;
        }
        var cb;
        for (var i = 0, len = fns.length; i < len; i++) {
            cb = fns[i];
            //之所以有cb.fn===fn，这和once的实现有关
            if (cb === fn || cb.fn === fn) {
                fns.splice(i, 1);
                return this;
            }
        }

    },
    once: function(type, fn) {
        this._cbs = this._cbs || {};
        var self = this;

        function onceOn() {
            self.off(type, onceOn);
            fn.apply(this, arguments);
        }
        onceOn.fn = fn;
        this.on(type, onceOn);
        return this;
    },
    emit: function(type) {

        this._cbs = this._cbs || {};
        var cbs = this._cbs[type];
        if (!cbs) {
            return this;
        }
        for (var i = 0, len = cbs.length; i < len; i++) {
            cbs[i].apply(this._ctx || this, Array.prototype.slice.call(arguments, 1));
        }
        return this;
    }
};


// var emiter=Object.create(Emitter);
// emiter.init();
// function a(){
//     console.log('a',arguments);
// }
// emiter.on('my',a);
// emiter.emit('my',1);
// emiter.off('my',a);
// emiter.emit('my');
// emiter.once('my',a);
// emiter.emit('my',1);
// emiter.emit('my',2);