function addHandler(elem,type,handler){
    elem.addEventListener(type,handler,false);
}
var data={
    username:{
        tips:'必填，长度为4-16字符',
        correct:'名称可用',
        dom:null,//存储对应的元素
        showDom:null,//显示验证信息的元素
        isPassed:false,//记录对应字段的验证信息是否通过

    },
    password:{
        tips:'请输入密码',
        correct:'密码可用',
        dom:null,//存储对应的元素
        showDom:null,//显示验证信息的元素        
        isPassed:false,//记录对应字段的验证信息是否通过
    },
    passwordAgain:{
        tips:'再次输入相同密码',
        correct:'密码输入正确',
        dom:null,//存储对应的元素
        showDom:null,//显示验证信息的元素        
        isPassed:false,//记录对应字段的验证信息是否通过
    },
    email:{
        tips:'请输入邮箱地址',
        correct:'手机格式正确',  
        dom:null,//存储对应的元素
        showDom:null,//显示验证信息的元素             
        isPassed:false,//记录对应字段的验证信息是否通过
    },
    phonenum:{
        tips:'请输入手机号码',
        correct:'手机格式正确',  
        dom:null,//存储对应的元素
        showDom:null,//显示验证信息的元素        
        isPassed:false,//记录对应字段的验证信息是否通过
    }
};

var strategies={
    required:function(value,errorMsg){
        if(value===''){
            return errorMsg;
        }
    },
    minLength:function(value,minLen,errorMsg){
        if(!(value&&value.length>=minLen)){
            return errorMsg;
        }
    },
    maxLength:function(value,maxLen,errorMsg){
        if(!(value&&value.length<=maxLen)){
            return errorMsg;
        }
    },
    range:function(value,minLen,maxLen,errorMsg){
        if(!(value&&value.length>=minLen&&value.length<=maxLen)){
            return errorMsg;
        }
    },
    email:function(value,errorMsg){
        if(!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test(value)){
            return errorMsg;
        }
    },
    phonenum:function(value,errorMsg){
        if(!/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)){
            return errorMsg;
        }   
    },
    same:function(value,id,errorMsg){
    //这种解决方法肯定不是最优的
        if(value!==document.getElementById(id).value){
            return errorMsg;
        }
    }

};
var Validator={
    init:function(){
        this.cache={};
    },
    valid:function(name,errorCallback,okCallback){
  
        var rules=this.cache[name],
            i,len;
        for(i=0,len=rules.length;i<len;i++){
            //console.log(rules[i]);
            if((errorMsg=rules[i]())!=undefined){
                errorCallback(errorMsg);                
                return errorMsg;
            }
        }
        okCallback();
    },
    add:function(elem,rules){
        var i,len,self=this;
        if(!this.cache[elem.name]){
            this.cache[elem.name]=[];
        }
        for(i=0,len=rules.length;i<len;i++){

            (function(curRule){
                self.cache[elem.name].push(function(){
                    var args=curRule['strategy'].split(':'),
                        strategy=args.shift(),
                        errorMsg=curRule['errorMsg'];
                    args.push(errorMsg);
                    args.unshift(elem.value);
                    errorMsg=strategies[strategy].apply(elem,args);
                    return errorMsg;
                });
            })(rules[i]);

        }
    }
};

function errorCallback(name,errorMsg){
    var curData=data[name];
    curData.showDom.innerHTML=errorMsg;
    curData.showDom.className='msg error';
    curData.dom.className='error';
    curData.isPassed=false;
}

function okCallback(name){
    var curData=data[name];
    curData.showDom.innerHTML=data[name]['correct'];
    curData.showDom.className='msg correct';
    curData.dom.className='correct';  
    curData.isPassed=true;  
}

function addFormHandler(name){
    var elem=data[name].dom,
        showElem=data[name].showDom;
    addHandler(elem,'focus',function(e){
        elem.className='';
        showElem.innerHTML=data[elem.name]['tips'];
        showElem.className='msg';
    });
    addHandler(elem,'blur',function(e){      

        validator.valid(name,function(errorMsg){
            errorCallback(name,errorMsg);
        },function(){
            okCallback(name);
        });
    });
}

var myForm=document.forms['my-form'],
    elems=myForm.elements, 
    validator=Object.create(Validator);
validator.init();

//elems是一个动态的nodeList，为了提高其性能，对其进行复制
for(var name  in data){
    data[name].dom=elems[name];
    data[name].showDom=document.getElementById(name+'-msg');
    data[name].isPassed=false;
}
//为用户名添加校验规则
validator.add(data['username'].dom,[{'strategy':'required','errorMsg':'用户名不能为空'},{'strategy':'range:4:16','errorMsg':'用户名长度为4-16个字符'}]); 
validator.add(data['password'].dom,[{'strategy':'required','errorMsg':'密码不能为空'}]);
validator.add(data['passwordAgain'].dom,[{'strategy':'same:password','errorMsg':'两次输入密码不一致'}]);
validator.add(data['email'].dom,[{'strategy':'email','errorMsg':'邮箱格式不正确'}]);
validator.add(data['phonenum'].dom,[{'strategy':'phonenum','errorMsg':'手机号码格式不正确'}]);
//为用户名的输入框添加事件
for(var key in data){
  addFormHandler(key);  
}

addHandler(myForm,'submit',function(e){
    var allParsed=true;
    for(var key in data){
        elems[key].focus();
        elems[key].blur();
        if(data[key].isPassed===false){
            allParsed=false;
        }
    }
    if(allParsed){
        alert('表单验证通过');
    }else{
        alert('表单验证未通过');
        e.preventDefault();           
    }
    
});
 


