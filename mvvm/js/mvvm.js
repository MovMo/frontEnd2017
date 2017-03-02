var MVVM = {
    init: function(options) {
        this.$opstions = options;
        this.data = options.data; //需要对数据加以监听
        this.methods = options.methods; //事件处理函数是不监听的
        var ob = Object.create(Observer);
        ob.init(this.data); //对data加以监控
        var self = this;
        Object.keys(this.data).forEach(function(key) {
            self._proxy(key);
        });
        this.$compile = Object.create(Compile);
        this.$compile.init(options.el, this);

    },
    //可以使用vm.prop直接访问，不需要通过vm.data.prop访问
    _proxy: function(key) {
        //var data={data:{a:1,b:{bb:2}}};
        //var vue=Object.create(MVVM); vue.init(data);
        //这种代理看起来似乎只能get或者set一级子属性,如vue.b,不能实现vue.b.bb
        //然而事实上是可以的，因为vue.b.bb事实上也是先执行了vue.b的get操作，既然能够得到vue.b，那么自然也能够得到vue.b.bb
        //同理，vue.b.bb=3;这种赋值操作，也是先进行了vue.b的get操作，再执行了针对bb的set操作
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                return self.data[key];
            },
            set: function(newVal) {
                self.data[key] = newVal;
            },
        });
    },
};