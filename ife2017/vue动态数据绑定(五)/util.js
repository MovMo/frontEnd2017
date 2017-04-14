var isArray=Array.isArray;
var isObject=function(val){
    return Object.prototype.toString.call(val,null)==='[object Object]';
};
var define=function(obj,key,val,enumerable){
    Object.defineProperty(obj,key,val,{
        value:val,
        enumerable:!!enumerable,
        writable:true,
        configurable:true
    });
};
 
