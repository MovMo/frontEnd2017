
var list=document.getElementById('list'),
    rightInBtn=document.getElementById('right-in'),
    leftInBtn=document.getElementById('left-in'),
    leftOutBtn=document.getElementById('left-out'),
    rightOutBtn=document.getElementById('right-out');


/***啊啊啊，审错题目了***
//direction为ture代表向右，direction为false代表向左，默认为向右
function move(start,end,speed,callback){
    var left=start,direction;
    if(typeof speed==='function'){
        callback=speed;
        speed=undefined;
    }
    speed=speed?speed:5;
    direction=end>start?true:false;//true代表向右运动，false代表向左运动
    speed=direction?+speed:-speed;

    var timeId=setInterval(function(){
        left+=speed;
        list.style.left=left+'px';
        if(!direction&&left<=end||direction&&left>=end){            
            clearInterval(timeId);
            if(callback){
               callback.call(this,arguments); 
            }
            
        }
    },100);
}

rightInBtn.addEventListener('click',function(e){
    if(!input.value){
        return;
    }   //获取元素当前的坐标

    list.lastElementChild.innerHTML=input.value;
    move(0,-50,function(){
        list.appendChild(list.firstElementChild);
        list.style.left=0;
    });
     
},false);

leftInBtn.addEventListener('click',function(e){
    if(!input.value){
        return;
    }
    //console.log('left-in');
    list.insertBefore(list.lastElementChild,list.firstElementChild);
    list.style.left='-50px';    
    list.firstElementChild.innerHTML=input.value;
    move(-50,0);

});
****/

/**实现效果，不基于队列的数据结构
function validate(){
    if(!input.value){
        alert('请输入一个数字');
        return false;
    }
    return true;
}
rightInBtn.addEventListener('click',function(e){
    if(validate()){
        var li=document.createElement('li');
        li.innerHTML=input.value;
        list.appendChild(li);        
    }

},false);
leftInBtn.addEventListener('click',function(e){
    if(validate()){
        var li=document.createElement('li');
        li.innerHTML=input.value;
        console.log(li.firstElementChild);
        list.insertBefore(li,list.firstElementChild);        
    }
},false);
function showMsg(elem){
    alert('你确定要删除'+elem.innerHTML+'吗');
}
leftOutBtn.addEventListener('click',function(e){
    if(list.children.length>0){
        var firstChild=list.firstElementChild;
        showMsg(firstChild);
        list.removeChild(firstChild);   
    }
    
},false);
rightOutBtn.addEventListener('click',function(e){
    if(list.children.length>0){
        var lastChild=list.lastElementChild;
         showMsg(lastChild);
        list.removeChild(lastChild);
    }
},false);
list.addEventListener('click',function(e){
    var target=e.target;
    console.log(target);
    if(target.nodeName.toLowerCase()==='li'){
        showMsg(target);

        list.removeChild(target);
    }
},false);
*/


var Queue={
    init:function(){
        this.queue=[];
    },
    rightIn:function(item){
        this.queue.push(item);
        this.paint();

    },
    leftIn:function(item){
        this.queue.unshift(item);
        this.paint();
    },
    isEmpty:function(){
        return this.queue.length===0;
    },
    rightOut:function(){
        if(!this.isEmpty()){
            alert(this.queue.pop());            
        }
        this.paint();
    },
    leftOut:function(){
        if(!this.isEmpty()){
            alert(this.queue.shift());
        }
        this.paint();
    },

    //渲染函数
    paint:function(){
        var str='';
        for(var i=0;i<this.queue.length;i++){
            str+='<li index='+i+'>'+this.queue[i]+'</li>';
        }
        list.innerHTML=str;
    },
    delete:function(index){
        if(!this.isEmpty()){
            alert(this.queue[index]);
            this.queue.splice(index,1);
            this.paint();
        }
    }

};

var queue=Object.create(Queue);
queue.init();
leftInBtn.addEventListener('click',function(){
    if(!/\d{1,}/.test(input.value)){
        alert('请输出数字！');
        return;
    }
    queue.leftIn(input.value);
},false);
rightInBtn.addEventListener('click',function(){
    if(!/\d{1,}/.test(input.value)){
        alert('请输出数字！');
        return;
    }
    queue.rightIn(input.value);
},false);

leftOutBtn.addEventListener('click',function(){
    queue.leftOut(input.value);
},false);
rightOutBtn.addEventListener('click',function(){
    queue.rightOut(input.value);
},false);
list.addEventListener('click',function(e){
    var target=e.target;
    if(target.nodeName.toLowerCase()==='li'){
        var index=+target.getAttribute('index');
        queue.delete(index);
    }

},false);