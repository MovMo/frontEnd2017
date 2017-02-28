//基于委托实现继承
var Observer=Object.create(Emitter);
Observer.setup=function(data){
    this.init();
    this.data=data;
    this.parents=null;
    if(isObject(data)){
        define(data,'$observer',this);    
    }      
      
    this.walk();
};
Observer.walk=function(){
    for(var key in this.data){
        if(this.data.hasOwnProperty(key)){
            var val=this.data[key];
            this.observe(key,val);
            this.convert(key,val);             
        }
 
    }
};
Observer.observe=function(key,val){     
    var ob=Object.create(Observer);
    ob.setup(val);
    (ob.parents||(ob.parents=[])).push({
        ob:this,
        key:key,
    });
    console.log(key,ob.parents);

};
Observer.convert=function(key,value){
    var self=this;
    Object.defineProperty(this.data,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            return value;
        },
        set:function(newValue){
            self.emit(key,newValue);
            value=newValue;
        }
    });
};
Observer.watch=function(key,fn){
    this.on(key,fn);
};
Observer.findParent=function(parent){
    var parents=this.parents;
    if(!parents){return -1;}
    var i=parents.length;
    while(i--){
        var p=parents[i];
        if(p.ob===parent){
            return i;
        }
    }
};

function fn(){
    console.log('fn',arguments);
}
var a={b:1,c:{d:1}};
var ob=Object.create(Observer); 
ob.setup(a);
 
