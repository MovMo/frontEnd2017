 

function disableField(field){
    field.style.display='none';
    field.disabled=true;
}
function enabelField(field){
    field.style.display='block';
    field.disabled=false;
}

var configForm=getById('configForm'),
    ruleField=getById('ruleField'),
    lengthField=getById('lengthField'),
    optionField=getById('optionField'),
    optionResult=getById('optionResult'),
    myForm=getById('myForm'),
    submitBtn=getById('submitBtn');
    

//选择不同的类型，呈现不同的fieldset
getById('typeRaidos').addEventListener('change',function(e){
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

var tagModule=Object.create(TagModule);
tagModule.init({'inputId':'options','outputId':'optionList','maxLength':3});

//阻止回车提交表单的默认行为
addHandler(configForm,'keydown',function(e){
    var code=e.charCode||e.keyCode;
    if(code===13){
        e.preventDefault();
    }
});
 

addHandler(configForm,'submit',function(e){
    //console.log(tagModule.cache);
    
    if(!optionField.disabled){
        optionResult.value=JSON.stringify(tagModule.cache);
        if(optionResult.value==='[]'){
            alert('请输入至少一个选项!');
            e.preventDefault();
            return;
        }
    }
    var configObj=JSON.parse(serialize(configForm)),
        field=Object.create(FieldModule);
    field.init(configObj,myForm); 
    //console.log(configStr);
    if(submitBtn.style.display==='none'){
        submitBtn.style.display='inline-block';
    } 

    e.preventDefault();
});


 

 
