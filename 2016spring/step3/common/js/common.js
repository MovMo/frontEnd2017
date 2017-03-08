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
Function.prototype.bind = Function.prototype.bind || function(context){
    var _this = this;
    
    return function(){
        _this.apply(context, arguments);
    };
};

//表单序列化为json字符串
function serialize(form){
    var i,
        len,
        elems=form.elements,
        elem,
        result={},
        type;
    for(i=0,len=elems.length;i<len;i++){
        elem=elems[i];
        switch(elem.type){             
            
            case 'select':
                var options=elem.chilren;
                for(var j=0;j<options.length;j++){
                    if(options[j].checked){
                        result[elem.name]=options[j].value;
                    }
                }
            break;
            case 'radio':
                if(!elem.checked){
                    break;
                }            
            default:
                if(!elem.disabled&&elem.name&&elem.value){
                    result[elem.name]=elem.value;
                }
            break;
        }
    }
    //console.log(JSON.stringify(result));
    return JSON.stringify(result);
}
//获得计算后的css样式
function getStyle(elem,style){
    var tmp=window.getComputedStyle(elem,null);
    return tmp[style];
}
//获取单选按钮选中值
function getCheckedRadioValue(name){
    var radios=document.getElementsByName(name);
    for(var i=0,len=radios.length;i<len;i++){
        if(radios[i].checked){
            return radios[i].value;
        }
    }
}
 
 
 