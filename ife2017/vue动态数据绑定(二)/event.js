var Event={
    init:function(){
        this.cache={};
    },
    addEvent:function(eventType,fn){
        if(!this.cache[eventType]){
            this.cache[eventType]=[];
        }
        this.cache[eventType].push(fn);
    },
    removeEvent:function(eventType,fn){
        //如果没有传递任何参数，那么删除绑定的任意事件上的任意函数
        if(arguments.length===0){
            this.cache={};
            return;
        }
        if(arguments.length===1){
            this.cache[eventType]=[];
            return;
        }
        let tmp=this.cache[eventType];
        for(let i=0,len=tmp.length;i<len;i++){
            if(tmp[i]===fn){
                tmp.splice(i,1);
                return;
            }
        }
    },
    trigger:function(eventType){
         
        var fns=this.cache[eventType],
            args=Array.prototype.slice.call(arguments,1);
        if(!fns){
            return;
        }
        for(let i=0,len=fns.length;i<len;i++){
            fns[i].apply(null,args);
        }
    }
};
 
 