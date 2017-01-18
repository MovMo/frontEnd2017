/*针对任务21，采用面向对象的方法进行代码重构*/
function addHandler(elem,type,handler){
    elem.addEventListener(type,handler);
}
function hasClass(elem,className){
    return (' '+elem.className+' ').indexOf(' '+className+' ')>=0;
}
function addClass(elem,className){
    if(hasClass(elem,className)){
        return;
    }
    elem.className+=' '+className;
}
function removeClass(elem,className){
    if(hasClass(elem,className)){
        var oldClass=''+elem.className+' ';
        elem.className=oldClass.replace(' '+className+' ',' ');
    }
}

 
var showUl={
    init:function(listId){
        this.data=[];
        this.list=document.getElementById(listId);
        var that=this;
        addHandler(this.list,'mouseover',function(e){
            that.mouseoverHandler.call(that,e);
        });
        addHandler(this.list,'mouseout',function(e){
            that.mouseoutHandler.call(that,e);
        });
        addHandler(this.list,'click',function(e){
            that.delItemHandler.call(that,e);
        });        
    },
    add:function(value){
        if(Array.isArray(value)){
            for(var i=0,len=value.length;i<len;i++){
                this.add(value[i]);
            }
        }
        if(typeof value==='string'){
            if(this.data.indexOf(value)>=0){
                //去重
                return;
            }
            //长度不能大于10
            if(this.data.length>=10){
                this.data.shift();
            }
            this.data[this.data.length]=value;    
            this.render();        
        }
    },
    mouseoverHandler:function(e){       
        var target=e.target,
            index;
        if(target.nodeName.toLowerCase()==='li'){
            index=target.getAttribute('index');
            addClass(target,'delete');
            //console.log(this.data);
            target.innerHTML='删除:'+this.data[index];
        }    

    },
    mouseoutHandler:function(e){
        var target=e.target,
            index;
        if(target.nodeName.toLowerCase()==='li'){
            index=target.getAttribute('index');
            removeClass(target,'delete');
            target.innerHTML=this.data[index];
        }
    },
    delItemHandler:function(e){
        var target=e.target,
            index;
        if(target.nodeName.toLowerCase()==='li'){
            index=target.getAttribute('index');
            this.data.splice(index,1);
            this.render();
        }
    },
    render:function(){
        var i,len,constr='';
        for(i=0,len=this.data.length;i<len;i++){
            constr+='<li index="'+i+'">'+this.data[i]+'</li>';
        }
        this.list.innerHTML=constr;
    }        
};


// var showUl={
//     init:function(listId){
//         this.data=[];
//         this.list=document.getElementById(listId);
//         addHandler(this.list,'mouseover',this.mouseoverHandler().call(this));
//         addHandler(this.list,'mouseout',this.mouseoutHandler);
//         addHandler(this.list,'click',this.delItemHandler);        
//     },
//     add:function(value){
//         if(Array.isArray(value)){
//             for(var i=0,len=value.length;i<len;i++){
//                 this.add(value[i]);
//             }
//         }
//         if(typeof value==='string'){
//             if(this.data.indexOf(value)>=0){
//                 //去重
//                 return;
//             }
//             //长度不能大于10
//             if(this.data.length>=10){
//                 this.data.shift();
//             }
//             this.data[this.data.length]=value;    
//             this.render();        
//         }

//     },
//     mouseoverHandler:function(){
//         return function(e){
//             var target=e.target,
//                 index;
//             if(target.nodeName.toLowerCase()==='li'){
//                 index=target.getAttribute('index');
//                 addClass(target,'delete');
//                 //console.log(this.data);
//                 target.innerHTML='删除:'+this.data[index];
//             }           
//         }

//     },
//     mouseoutHandler:function(e){
//         var target=e.target,
//             index;
//         if(target.nodeName.toLowerCase()==='li'){
//             index=target.getAttribute('index');
//              removeClass(target,'delete');
//             target.innerHTML=this.data[index];
//         }
//     },
//     delItemHandler:function(e){
//         var target=e.target,
//             index;
//         if(target.nodeName.toLowerCase()==='li'){
//             index=target.getAttribute('index');
//             this.data.splice(index,1);
//             this.render();
//         }
//     },
//     render:function(){
//         var i,len,constr='';
//         for(i=0,len=this.data.length;i<len;i++){
//             constr+='<li index="'+i+'">'+this.data[i]+'</li>';
//         }
//         this.list.innerHTML=constr;
//     }

// };

var tagInput=document.getElementById('tagInput'),
    regText=/(.*)[,\，\s]$/,
    tagList=Object.create(showUl);
tagList.init('tag-list');
addHandler(tagInput,'keyup',function(e){
    var code=e.charCode||e.keyCode,
        result=this.value.match(regText);        
    if(result){
        tagList.add(result[1]);
        this.value='';
    }else if(code===13){
        tagList.add(this.value);
        this.value='';
    }
});

var hobbyTa=document.getElementById('hobby'),
    certainBtn=document.getElementById('certain'),
    hobbyList=Object.create(showUl);
hobbyList.init('hobby-list');
addHandler(certainBtn,'click',function(e){
    var value=hobbyTa.value,values;
    if(value){
        values=value.split(/[^a-zA-Z\d\u4E00-\u9FA5]+/);
        hobbyList.add(values);
        hobbyTa.value='';
    }
});