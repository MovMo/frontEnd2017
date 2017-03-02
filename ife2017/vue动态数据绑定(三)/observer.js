//基于委托实现继承

var Observer = Object.create(Emitter);

Observer.setup = function(data) {
    if (!isObject(data)) {
        return;
    }
    this.init();
    this.data = data;
    this.parent = null;
    this.walk();

};
Observer.walk = function() {
    for (var key in this.data) {
        if (this.data.hasOwnProperty(key)) {
            var val = this.data[key];
            this.observe(key, val);
            this.convert(key, val);
        }

    }
};
//
Observer.observe = function(key, val) {
    //如果深层的value是
    var ob = Object.create(Observer);
    ob.setup(val);
    ob.parent = {
        'ob': this,
        'key': key,
    };

};


Observer.convert = function(key, value) {
    var self = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return value;
        },
        set: function(newValue) {
            if (value ===newValue) {
                return;
            }
            self.notify(key, key, newValue);
            //如果重新设置的newValue是对象的话，需要对该对象加以监听
            //self.unObserve(key, value);
            self.observe(key, newValue);
            value = newValue;
        }
    });
};
Observer.pathDelimiter = '\b';
Observer.notify = function(key, path, val) {
    this.emit(key, path, val);
    if (this.parent) {
        var ob = this.parent.ob,
            parentKey = this.parent.key;
        path = parentKey + Observer.pathDelimiter + path;
        //递归调用，使得事件向上传递
        ob.notify(parentKey, path, val);
    }
}
Observer.$watch = function(key, fn) {
    this.on(key, fn);
};

