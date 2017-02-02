var TagModule={
    //data的格式：
    //{ 
    //  inputId:'',
    //  outputId:'',
    //  length:'',
    //}
    init:function(data){
        this.inputDom=getById(data.inputId);
        this.outputDom=getById(data.outputId);
        this.maxLength=data.maxLength;
        this.cache=[];
        this.addEvent();
        this.inputReg=/^(.+)[,，；;\s]$/;
    },
    addEvent:function(){
        //输入元素对应的事件
        addHandler(this.inputDom,'keyup',this.keyupHandler.bind(this));
        //输出元素对应的事件
        addHandler(this.outputDom,'mouseover',this.mouseoverHander.bind(this));
        addHandler(this.outputDom,'click',this.clickHandler.bind(this));
        addHandler(this.outputDom,'mouseout',this.mouseoutHandler.bind(this));
    },
    keyupHandler:function(e){
        //可以使用,，；;\s等分割
        var code=e.charCode||e.keyCode,
            value=this.inputDom.value,
            regResult;
        if(code===13){
            if(value.trim()){
                this.addItem(value);
                //e.preventDefault();                
            }
        }else if((regResult=value.match(this.inputReg))!=null){
            this.addItem(regResult[1]);
        } 
    },
    mouseoverHander:function(e){
        var target=e.target,
            index;
        if(target.nodeName.toLowerCase()==='li'){
            this.resetItemsClass();
            index=target.getAttribute('index');
            target.innerHTML='删除：'+this.cache[+index];
            addClass(target,'delete');
        }
    },
    clickHandler:function(e){
        var target=e.target,
            index;
        if(target.nodeName.toLowerCase()==='li'){
            index=target.getAttribute('index');
            this.cache.splice(+index,1);
        }
        this.render();
    },
    mouseoutHandler:function(e){
        var target=e.target,
            index;
        if(target.nodeName.toLowerCase()==='li'){
            removeClass(target,'delete');
            index=target.getAttribute('index');
            target.innerHTML=this.cache[+index];
        }        
    },
    resetItemsClass:function(){
        var i,len,
            children=this.outputDom.children;
        for(i=0,len=children.length;i<len;i++){
            removeClass(children[i],'delete');
        }
    },
    addItem:function(value){
        if(this.cache.indexOf(value)>=0){
            return;
        }
        if(this.cache.length>=this.maxLength){
            this.cache.shift();            
        }
        this.cache[this.cache.length]=value;
        this.inputDom.value='';
        this.render();
    },
    delItem:function(index){
        this.cache.splice(index,1);
        this.render();
    },
    render:function(){
        var i,len,constr='';
        for(i=0,len=this.cache.length;i<len;i++){
            constr+='<li index="'+i+'">'+this.cache[i]+'</li>'
        }
        this.outputDom.innerHTML=constr;
    }

};