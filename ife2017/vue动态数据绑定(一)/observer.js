Observer=function(data){
    this.data=data;
    this.walk();
};
Observer.prototype.walk=function(){
    for(var key in this.data){
        //hasOwnProperty会检查属性是否存在于对象中，不会检查原型链
        if(this.data.hasOwnProperty(key)){
            var val=this.data[key];
            this.convert(key,val);
            if(Object.prototype.toString.call(val)==='[object Object]'){
                console.log(val);
                new Observer(val);
            }
        }
    }
};
Observer.prototype.convert=function(key,val){
    Object.defineProperty(this.data,key,{
        //如果设置了访问描述符（setter,getter或者两者都有）的时候，javascript会忽略他们的value与writable,取而代之关系setter和getter
        configurable:true,
        enumerable:true,
        get:function(){
            console.log('你访问了'+key);    
            return val;               
        },
        set:function(newValue){
            console.log('你设置了 '+key+'，新的值为 '+newValue);
            val=newValue;
        },
    });
};