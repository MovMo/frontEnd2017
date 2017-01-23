//表单序列化为json

function addHandler(elem,type,handler){
    elem.addEventListener(type,handler);
}
function getById(id){
    return document.getElementById(id);
}
//表单序列化
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
function disableField(field){
    field.style.display='none';
    field.disabled=true;
}
function enabelField(field){
    field.style.display='block';
    field.disabled=false;
}
function addChild(form,jsonStr){
    var config=JSON.parse(jsonStr),
        type=config['type'],
        isRequired=config['isRequired'],
        style=config['style'],
        rule=config['rule'],
        label=config['label'],
        div;
    div=document.createElement('div');
    div.className='input-group';
    constr='';
    if(type==='text'){
        constr+='<div class="field-wrapper"><label>'+label+'</label><input type="text"></div><span class="tips">'+(isRequired?'必填:':'选填:')+'请输入'+label+'</span>'
    }
    div.innerHTML=constr;
    form.appendChild(div);
}

//实现空格，逗号，回车添加选项的功能
var TagComponent={
    init:function(input,output){
        this.cache=[];
        this.input=getById(input);
        this.output=getById(output);
        var self=this,
            regItem=/^(.+)[,\s，]$/;
        addHandler(this.input,'keyup',function(e){
            var regResult,value;
            regResult=this.value.match(regItem);
            console.log(regResult);
            if(regResult!=null){
                value=regResult[1];
            }else if(e.keyCode===13){
                value=this.value;
            }       

            if(value){
                 self.add(value);
                 self.input.value='';
            }
            
        }); 
        addHandler(this.output,'mouseover',function(e){
            var target=this.target;
            if(target.nodeName.toLowerCase()==='li'){
                target.innerHMTL='';
            }
        });
    },
    add:function(value){
        if(this.cache.indexOf(value)<0){
            return;
        }        
        var li=document.createElement('li');
        li.innerHTML=value;
        li.setAttribute('index',this.cache.length)
        this.cache[this.cache.length](value);
        this.output.appendChild(li);
    }
};
var configForm=getById('configForm'),
    label=getById('label'),
    ruleField=getById('ruleField'),
    lengthField=getById('lengthField'),
    optionField=getById('optionField'),
    myForm=getById('myForm');


//选择不同的类型，呈现不同的fieldset
getById('typeRaidos').addEventListener('click',function(e){
    var target=e.target;
    if(target.type="radio"){
        switch(target.value){
            case 'text':
                enabelField(ruleField);
                enabelField(lengthField);
                disableField(optionField);
            break;
            case 'textarea':
                disableField(ruleField);
                enabelField(lengthField);
                disableField(optionField);         
            break;
            default:
                disableField(ruleField);
                disableField(lengthField);
                enabelField(optionField);            
            break;
        }
        label.value=target.nextSibling.data;
       
    }

},false);
var tagComponent=Object.create(TagComponent);
tagComponent.init('options','optionList');

addHandler(configForm,'submit',function(e){
    var cofigStr=serialize(this);
    addChild(myForm,cofigStr);
    e.preventDefault();
 });
