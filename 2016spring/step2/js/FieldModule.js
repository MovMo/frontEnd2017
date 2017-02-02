//{"type":"text","label":"文本框","isRequired":"true","style":"style1","rule":"text","minLength":"2","maxLength":"13","optionResult":"[\"1\",\"2\"]"}
//form:文本域所归属的表单DOM
var FieldModule={
    init:function(data,form){
        this.form=form;
        this.data=data;
        this.create();
        this.addEvent();
    },
    create:function(){
        switch(this.data.type){
            case 'text':
                this.createText();
            break;
            case 'radio':
                this.createRadio();
            break;
            case 'checkbox':
                this.createCheckbox();
            break;
            case 'select':
                this.createSelect();
            break;
            case 'textarea':
                this.createTextarea();
        }
    },
    createText:function(){
        var label=this.data['label']||'',
            div=document.createElement('div'),
            required=this.data['isRequired']==='true'?true:false,
            minLength=this.data['minLength']?+this.data['minLength']:undefined,
            maxLength=this.data['maxLength']?+this.data['maxLength']:undefined,
            tip=(required?'必填':'选填')+(minLength?';最小长度'+minLength:'')+(maxLength?',最大长度'+maxLength:''),
        //先暂时不考虑规则
            constr='<label for="" class="label">'+label+'</label><input type="text"  ><span>'+tip+'</span>';
        div.className='input-group';
        div.innerHTML=constr;
        this.form.insertBefore(div,this.form.lastElementChild);
    },
    createRadio:function(){
        var label=this.data['label']||'',
            div=document.createElement('div'),
            required=this.data['isRequired']==='true'?true:false,
            option=JSON.parse(this.data['optionResult']),             
            tip=(required?'必填':'选填')+',请选择您的'+label,
            constr='<label class="label">'+label+'</label>',
            i,len;
        for(i=0,len=option.length;i<len;i++){
            constr+='<label><input type="radio" value="'+i+'">'+option[i]+'</label>';
        }    
        constr+='<span>'+tip+'</span>';       
            
        div.className='input-group';
        div.innerHTML=constr;
        this.form.insertBefore(div,this.form.lastElementChild);        

    },
    createCheckbox:function(){
        var label=this.data['label']||'',
            div=document.createElement('div'),
            required=this.data['isRequired']==='true'?true:false,
            option=JSON.parse(this.data['optionResult']),             
            tip=(required?'必填':'选填')+',请选择您的'+label,
            constr='<label class="label">'+label+'</label>',
            i,len;
        for(i=0,len=option.length;i<len;i++){
            constr+='<label><input type="checkbox" value="'+i+'">'+option[i]+'</label>';
        }    
        constr+='<span>'+tip+'</span>';       
            
        div.className='input-group';
        div.innerHTML=constr;
        this.form.insertBefore(div,this.form.lastElementChild);           
    },
    createSelect:function(){
        var label=this.data['label']||'',
            div=document.createElement('div'),
            required=this.data['isRequired']==='true'?true:false,
            option=JSON.parse(this.data['optionResult']),             
            tip=(required?'必填':'选填')+',请选择您的'+label,
            constr='<label class="label">'+label+'</label><select>',
            i,len;
        for(i=0,len=option.length;i<len;i++){
            constr+=' <option value="'+i+'">'+option[i]+'</option>';
        }    
        constr+='</select><span>'+tip+'</span>';       
            
        div.className='input-group';
        div.innerHTML=constr;
        this.form.insertBefore(div,this.form.lastElementChild);            
    },
    createTextarea:function(){
        var label=this.data['label']||'',
            div=document.createElement('div'),
            required=this.data['isRequired']==='true'?true:false,
            minLength=this.data['minLength']?+this.data['minLength']:undefined,
            maxLength=this.data['maxLength']?+this.data['maxLength']:undefined,
            tip=(required?'必填':'选填')+(minLength?';最小长度'+minLength:'')+(maxLength?',最大长度'+maxLength:''),
        //先暂时不考虑规则
            constr='<label for="" class="label">'+label+'</label><textarea></textarea><span>'+tip+'</span>';
        div.className='input-group';
        div.innerHTML=constr;
        this.form.insertBefore(div,this.form.lastElementChild);        
    },
    addEvent:function(){}
    
     
};