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
            if (value === newValue) {
                return;
            }
            // console.log('调用了set:设置', key + '的新值为' + newValue + ',原来的值是' + value);
            // console.log('set函数执行时的回调函数列表：' + self._cbs);
            self.notify(key
, value,newValue);
            //如果重新设置的newValue是对象的话，需要对该对象加以监听
            //self.unObserve(key, value);
            self.observe(key, newValue);
            value = newValue;
        }
    });
};
Observer.pathDelimiter = '\b';
Observer.notify = function(key, oldValue, newValue) {
    this.emit(key, oldValue, newValue);
    if (this.parent) {
        var ob = this.parent.ob,
            parentKey = this.parent.key;
        // path = parentKey + Observer.pathDelimiter + path;
        //如果想要观察路径，可以打印path
        //递归调用，使得事件向上传递
        ob.notify(key, oldValue, newValue);
    }
}
Observer.$watch = function(key, fn) {
    this.on(key, fn);
};

/***********************测试****************************/
//如果set事件不冒泡到顶层的话，会导致下面的问题（即没有L63-L69的代码的话）

//下面的执行没有问题

// var testOption = { name: 'bobo'  }
// var testOb = Object.create(Observer);
// testOb.setup(testOption);
// testOb.$watch('name', function() {
//     console.log('监听函数被调用，参数arguments是：', arguments);
// });

//但如果是这种情况，发现是有问题的
//因为testOb是最外层key对应的observer，在对name增加监听的时候，又新建了一个observer
//然而所有的监听函数都只添加添加到了最外层key对应的observer（testOb）上，但是set中notify的触发，是各自的key对应的observer，
//例如name属性对于对应的observer ！== testOb, (即set函数中的self!=testOb)上面是没有绑定name对应的回调函数的，所以不能触发事件

// var testOption = {user:{ name: 'bobo'}  }
// var testOb = Object.create(Observer);
// testOb.setup(testOption);
// testOb.$watch('name', function() {
//     console.log('监听函数被调用，参数arguments是：', arguments);
// });
