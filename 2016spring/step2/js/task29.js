 
var strategies={
    required:function(elem,errorMsg){
        if(!elem.value){
            return errorMsg;
        }
    },
    minLength:function(elem,num,errorMsg){
       if(!elem.value||elem.value.length<num){
        return errorMsg;
       }
    },
    maxLength:function(elem,num,errorMsg){
        if(!elem.value||elem.value.length>num){
            return errorMsg;
        }
    }
};
// var Validator={
//     init:function(OKMsg){
//         this.cache={};
//         this.OKMsg=OKMsg;
//     },
//     add:function(elem,rules){
//         var rule,self=this,elemName=elem.name;
//         if(!this.cache[elemName]){
//             this.cache[elemName]=[];
//         }
//         for(var i=0,len=rules.length;i<len;i++){
//             rule=rules[i];
//             (function(rule){
//                 self.cache[elemName].push(function(){
//                     var args,strategy,errorMsg;
//                     args=rule['strategy'].split(':');
//                     strategy=args.shift();
//                     args.push(rule['errorMsg']);
//                     args.unshift(elem);
//                     errorMsg=strategies[strategy].apply(elem,args);

//                 });
//             })(rule);

//         }
//     },
//     valid:function(){
//         var i,len,errorMs,rules,msgDiv,valid;
//         for(var elemName in this.cache){  
//             msgDiv=           
//             rules=this.cache[elemName];
//             valid=false;
//             for(i=0,len=rules.length;i<len;i++){
//                 if((errorMsg=rules[i]())!=null){   
//                     //显示错误的提示消息
//                     msgDiv.innerHTML=errorMsg;
//                     msgDiv.className='msg error'; 
//                     break;                   
//                 }
//             }            
//             //显示成功的提示消息 
//                 msgDiv.innerHTML=OKMsg;
//                 msgDiv.className='msg correct';
//                 valid=true;                      
//         }
//         return valid;
        
//     }
// };

var form=document.forms['my-form'],
    input=form.username,
    msgDiv=document.getElementById('msg');
form.addEventListener('submit',function(e){
    var value=input.value;
    if(value===''){
        msgDiv.className='msg error';
        msgDiv.innerHTML='输入不能为空';    
        e.preventDefault();
    }else if(getLen(value)<4||getLen(value)>16){
        msgDiv.className='msg error';
        msgDiv.innerHTML='输入长度应为4-16个字符';    
        e.preventDefault();        
    }else{
        msgDiv.className='msg correct';
        msgDiv.innerHTML='名称格式正确'; 
        //事实上到了这一步，应当可以提交了   
        e.preventDefault();        
    }

},false);
function getLen(str){
    var len=0,i,code;
    for(var i=0;i<str.length;i++){
        code=str.charCodeAt(i);
        if(code>=0&&code<=128){
            len+=1;
        }else{
            len+=2;
        }

    }
    return len;
}
 