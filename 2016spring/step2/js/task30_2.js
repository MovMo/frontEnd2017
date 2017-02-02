//表单验证的配置数据
var formData={
    'username':{
        id:'username',
        rules:[
            {rule:'required',errorMsg:'名称不能为空'},
            {rule:'minLength',args:[4],errorMsg:'名称长度不能小于4'},
            {rule:'maxLength',args:[16],errorMsg:'名称长度不能大于16'}
        ],
        correctMsg:'名称可用',
        tipDomId:'',
        tipMsg:'必填，名称长度为4到16个字符',
       
    },
    'password':{
        id:'password',
        rules:[
            {rule:'required',errorMsg:'密码不能为空'},
        ],
        correctMsg:'密码可用',
        tipDomId:'',
        tipMsg:'请输入密码',
        
    },
    'passwordAgain':{
        id:'passwordAgain',
        rules:[ 
            {rule:'same',args:['password'],errorMsg:'两次密码输入不一致'},
        ],
        correctMsg:'两次密码输入一致',
        tipDomId:'',
        tipMsg:'再次输入密码',
       
    },
    'email':{
        id:'email',
        rules:[ 
            {rule:'email',errorMsg:'邮箱格式不正确'},
        ],
        correctMsg:'邮箱格式正确',
        tipDomId:'',
        tipMsg:'请输入邮箱',
         
    },
    'phoneNum':{
        id:'phoneNum',
        rules:[ 
            {rule:'phoneNum',errorMsg:'电话号码格式不正确'},
        ],
        correctMsg:'电话号码格式正确',
        tipDomId:'',
        tipMsg:'请输入电话号码',
         
    },
};

var formArr=[];
for(var key in formData){
    var field=Object.create(FieldData);
    field.init(formData[key]);
    formArr.push(field);
}

addHandler(getById('myForm'),'submit',function(e){
    var i,len,allParsed=true,errorMsg,sumMsg='';
    for(i=0,len=formArr.length;i<len;i++){
        if((errorMsg=formArr[i].valid())!=null){
            sumMsg+=errorMsg+'\n';             
        }
    }
    if(sumMsg){
        alert('表单格式不正确:\n'+sumMsg);
    }else{
        alert('表单格式正确');
    }
    e.preventDefault();
});
