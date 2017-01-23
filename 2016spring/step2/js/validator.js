var Validator={
    required:function(value,errorMsg){
        if(value===''){
            return errorMsg;
        }
    },
     
    minLength:function(value,minLen,errorMsg){
         
        if(!value||value.length<minLen){
            return errorMsg;
        }
         
    },
    maxLength:function(value,maxLen,errorMsg){
         
        if(!value||value.length>maxLen){
            return errorMsg;
        }
       
    },
   
    email:function(value,errorMsg){
        
        if(!value||!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test(value)){
            return errorMsg;
        }
         
    },
    phoneNum:function(value,errorMsg){
        
        if(!value||!/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)){
            return errorMsg;
        }   
    },
    same:function(value,id,errorMsg){
        
        if(!value||value!==document.getElementById(id).value){
            return errorMsg;
        }
    }    
};