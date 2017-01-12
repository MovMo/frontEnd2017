
var list=document.getElementById('list'),
    rightInBtn=document.getElementById('right-in'),
    leftInBtn=document.getElementById('left-in'),
    leftOutBtn=document.getElementById('left-out'),
    rightOutBtn=document.getElementById('right-out');


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
    queue.leftIn(input.value);
},false);
rightInBtn.addEventListener('click',function(){
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

function initList(){
    var i,height,li,constr;

    for(i=0;i<10;i++){
        height=Math.random()*90+10;
        constr+='<li style="height:'+height+'px"></li>';
    }
    list.innerHTML=constr;
}
initList();
