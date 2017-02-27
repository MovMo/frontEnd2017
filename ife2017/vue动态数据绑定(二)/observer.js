Observer = function(data) {
    this.data = data;
    this.walk();
    this.events=Object.create(Event);
    this.events.init();
};
Observer.prototype.walk = function() {
    for (var key in this.data) {
        //hasOwnProperty会检查属性是否存在于对象中，不会检查原型链
        if (this.data.hasOwnProperty(key)) {
            var val = this.data[key];
            if (Object.prototype.toString.call(val) === '[object Object]') {
                //递归调用
                new Observer(val);
            }
            this.convert(key, val);

        }
    }
};
//该方法将原对象的每一个属性改写为访问器属性
Observer.prototype.convert = function(key, val) {
    var self=this;
    Object.defineProperty(this.data, key, {
        //如果设置了访问描述符（setter,getter或者两者都有）的时候，javascript会忽略他们的value与writable,取而代之关系setter和getter
        configurable: true,
        enumerable: true,
        get: function() {
            console.log('你访问了' + key);
            return val;
        },
        set: function(newValue) {
            //console.log('你设置了 ' + key + '，新的值为 ' + newValue);
            //触发watch添加的事件            
            self.events.trigger(key,newValue);            
            if (val === newValue) {
                return;
            }
            //如果重新设置的属性值为对象的话，依旧可以在访问或者设置时调用回调
            if(Object.prototype.toString.call(newValue) === '[object Object]'){
                val=new Observer(newValue).data;
                return;
            } 
            val = newValue;                         
        },
    });
};
//使用发布-订阅者模式实现watch,在propName发生改变的时候触发callback
Observer.prototype.watch=function(propName,callback){
    this.events.addEvent(propName,callback);
};