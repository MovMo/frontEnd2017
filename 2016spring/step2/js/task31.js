//实现单选框和下方的tab联动
function getById(id){
    return document.getElementById(id);
}
function addHandler(elem,type,handler){
    elem.addEventListener(type,handler,false);
}
var tabWrapper=getById('tab-wrapper'),
    tabs=tabWrapper.children;

function showTab(index){
    for(var i=0,len=tabs.length;i<len;i++){
        tabs[i].style.display='none';
    }
    tabs[index].style.display='block';
}
addHandler(getById('radio-wrapper'),'click',function(e){    
    var target=e.target,index;
    if(target.name==='people'){
        index=target.value;
        showTab(+index);
    }
});

//实现两个下拉菜单的联动
var cityData={
    '11':'北京',
    '13':'上海',
    '41':'河南'
};
var schoolData={
    '11':{
        '110101':'北京大学',
        '110102':'清华大学',
        '110105':'北京邮电大学'
    },
    '13':{
        '130101':'上海大学',
        '130201':'上海交通大学'
    },
    '41':{
        '410101':'河南大学',
        '410102':'郑州大学',
    }

};
var citySelect=getById('citySelect'),
    provinceSelect=getById('schoolSelect');
function renderSelect(dom,data){
    var key,constr='';
    for(key in data){
        constr+='<option value="'+key+'">'+data[key]+'</option>';
    }
    dom.innerHTML=constr;
    dom.selectedIndex=0;
}
renderSelect(citySelect,cityData);
renderSelect(schoolSelect,schoolData[citySelect.options[citySelect.selectedIndex].value]);
addHandler(citySelect,'change',function(e){
    var data=schoolData[this.options[this.selectedIndex].value];
    renderSelect(schoolSelect ,data);
});

