function getById(id){
    return document.getElementById(id);
}
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

var tagInput=getById('tagInput'),
    tagList=getById('tag-list');
var tagData=[];


function mouseOverHandler(e,arr){
    var target=e.target;
    if(target.nodeName.toLowerCase()==='li'){
        var index=target.getAttribute('index');
        target.innerHTML='删除：'+arr[index];
        addClass(target,'delete');
    }
}
function mouseOutHandler(e,arr){
    var target=e.target;
    if(target.nodeName.toLowerCase()==='li'){
        var index=target.getAttribute('index');
        target.innerHTML=arr[index];
        removeClass(target,'delete');
    }    
}
function deleteHandler(e,ul,arr){
    var target=e.target,
        index=-1;
    if(target.nodeName.toLowerCase()==='li'){
        if(hasClass(target,'delete')){
            index=target.getAttribute('index');
            arr.splice(index,1);
            render(ul,arr);
        } 
    }    
}
function add(arr,str){
    if(Array.isArray(str)){
        str.forEach(function(item){
            add(arr,item);
            return;
        });
    }
    if(typeof str==='string'){
        if(arr.indexOf(str)>=0){
            return;//去重
        }
        arr[arr.length]=str;
        if(arr.length>=11){
            arr.shift();
        }       
    }
    
}
function render(ul,arr){
    var tmp=arr.filter(function(item){
        if(item.trim()){
            return true;
        }else{
            return false;
        }
        }),
        constr='';
    for(var i=0,len=tmp.length;i<len;i++){
        constr+='<li index='+i+'>'+tmp[i]+'</li>'
    }
    ul.innerHTML=constr;
}

addHandler(tagInput,'keyup',function(e){
    var code=e.charCode||e.keyCode;
    if(code===13||code===32||code===188){
        var value=tagInput.value;
        add(tagData,value);
        tagInput.value='';
        render(tagList,tagData);
    }
});
addHandler(tagList,'mouseover', function(e){
    mouseOverHandler.call(null,e,tagData);
});
addHandler(tagList,'mouseout',function(e){
    mouseOutHandler.call(null,e,tagData);
}); 
addHandler(tagList,'click',function(e){
    deleteHandler.call(null,e,tagList,tagData);
});

var certainBtn=getById('certain'),
    hobbyTa=getById('hobby'),
    hobbyData=[],
    hobbyList=getById('hobby-list');
addHandler(certainBtn,'click',function(e){
    add(hobbyData,hobbyTa.value.split(/[^a-zA-Z\d\u4E00-\u9FA5]+/));
    console.log(hobbyData);
    render(hobbyList,hobbyData);
});
addHandler(hobbyList,'mouseover', function(e){
    mouseOverHandler.call(null,e,hobbyData);
});
addHandler(hobbyList,'mouseout',function(e){
    mouseOutHandler.call(null,e,hobbyData);
}); 
addHandler(hobbyList,'click',function(e){
    deleteHandler.call(null,e,tagList,hobbyData);
});