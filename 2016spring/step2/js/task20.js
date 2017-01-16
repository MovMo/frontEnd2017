//允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
function getById(id){
    return document.getElementById(id);
}
function addHanlder(elem,type,handler){
    elem.addEventListener(type,handler,false);
}
var text=getById('text'),
    keyWord=getById('keyWord'),
    insertBtn=getById('insertBtn'),
    queryBtn=getById('queryBtn'),
    wrapper=getById('queryBtn'),
    arrData=[];
function process(text){
    var retText=/[^a-zA-Z\d\u4E00-\u9FA5]+/;
    return text.trim().split(retText).filter(function(item){
        if(item.trim()){
            return true;
        }else{
            return false;
        }        
    });
}
function render(str){
    var reg,needFilter=!!str;
    if(needFilter){
        reg=new RegExp(str,'g');
    }    
    var constr=arrData.map(function(item){
        if(needFilter){
            item=item.replace(reg,function(e){
                return '<span class="selected">'+e+'</span>'
            });
        }
        return '<li>'+item+'</li>'
    }).join('');
    
    list.innerHTML=constr;
}

addHanlder(insertBtn,'click',function(e){
    arrData=arrData.concat(process(text.value.trim()));
    render();
}); 
addHanlder(queryBtn,'click',function(e){
    var keyWordText=keyWord.value.trim();
    render(keyWordText);
});



