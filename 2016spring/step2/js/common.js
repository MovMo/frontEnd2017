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
