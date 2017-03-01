//基于委托实现继承

var Observer = Object.create(Emitter);

Observer.setup = function(data) {
    this.init();
    this.data = data;
    this.parent = null;  

    if (isObject(data)) {
        define(data,'$observer',this);
        this.walk();
    }
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
Observer.unObserve=function(key,val){
    //这里貌似有问题，如果val是基本值的话，无法为其定义$observer属性
    var ob=val&&val.$observer;
    if(ob){
        ob.parent=null;
    }
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
            self.notify(key, key, newValue);
            //如果重新设置的newValue是对象的话，需要对该对象加以监听
            self.unObserve(key,value);
            self.observe(key,newValue );
            value = newValue;
        }
    });
};
Observer.pathDelimiter = '\b';
Observer.notify = function(key, path, val) {
    this.emit(key, path, val);
    if (this.parent) {
        var ob = this.parent.ob,
            key = this.parent.key;
        path = key +Observer.pathDelimiter+ path;
        //递归调用，使得事件向上传递
        ob.notify(key, path, val);
    }
}
Observer.$watch = function(key, fn) {
    this.on(key, fn);
};

let app2 = Object.create(Observer);
app2.setup({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});


app2.$watch('name', function(newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});
// app2.$watch('name', function(newName) {
//     console.log('set',arguments)
// });