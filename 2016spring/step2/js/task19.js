
var list=document.getElementById('list'),
    rightInBtn=document.getElementById('right-in'),
    leftInBtn=document.getElementById('left-in'),
    leftOutBtn=document.getElementById('left-out'),
    rightOutBtn=document.getElementById('right-out');


var Queue={
    init:function(){
        this.queue=[];
    },
    valid:function(item){
        if(!/\d{2}/.test(item)){
            alert('请输入10-100之间的数字');
            return;
        }
    },
    rightIn:function(item){
        this.valid(item);
        this.queue.push(item);
    },
    leftIn:function(item){
        this.valid(item);
        this.queue.unshift(item);
    },
    isEmpty:function(){
        return this.queue.length===0;
    },
    rightOut:function(){
        if(!this.isEmpty()){
            alert(this.queue.pop());            
        }

    },
    leftOut:function(){
        if(!this.isEmpty()){
            alert(this.queue.shift());
        }

    },
    delete:function(index){
        if(!this.isEmpty()){
            alert(this.queue[index]);
            this.queue.splice(index,1);
        }
    }

};
var queue=Object.create(Queue);
queue.init();
function paint(){
    var str='';
    for(var i=0;i<queue.queue.length;i++){
        str+='<li index='+i+' style="height:'+queue.queue[i]+'px">'+queue.queue[i]+'</li>';
    }
    list.innerHTML=str;    
}



leftInBtn.addEventListener('click',function(){
    queue.leftIn(input.value);
    paint();
},false);
rightInBtn.addEventListener('click',function(){
    queue.rightIn(input.value);
    paint();
},false);

leftOutBtn.addEventListener('click',function(){
    queue.leftOut(input.value);
    paint();
},false);
rightOutBtn.addEventListener('click',function(){
    queue.rightOut(input.value);
    paint();
},false);
list.addEventListener('click',function(e){
    var target=e.target;
    if(target.nodeName.toLowerCase()==='li'){
        var index=+target.getAttribute('index');
        queue.delete(index);
        paint();
    }

},false);

function initList(){
    var i,value;
    for(i=0;i<10;i++){
       value=Math.floor(Math.random()*90+10);
       queue.rightIn(value); 
    }
    paint();
}
initList();
var lis=list.children;
 

function swap(arr,i,j,callback){
    if(i===j){
        return;
    }
    lis[i].style.height=arr[j]+'px';
    lis[i].innerHTML=arr[j];
    lis[j].style.height=arr[i]+'px';
    lis[j].innerHTML=arr[i];
    var tmp=arr[i];
    arr[i]=arr[j];
    arr[j]=tmp;
}
function bubbleSort(arr){
    var maxIndex=arr.length-1,
        i=maxIndex,
        j=0,
        timeId;
    // for(i=maxIndex;i>=1;i--){
    //     for(j=0;j<=i-1;j++){
    //         if(arr[j]>arr[j+1]){
    //             swap(arr,j,j+1);
    //         }
    //     }
    // }
    // 
    //将循环转换为定时函数
    /*
    timeId=setInterval(function(){
        if(arr[j]>arr[j+1]){
            swap(arr,j,j+1);
        }
        j++;
        console.log('j:'+j+',i:'+i);
        if(j>i-1){
            i--;
            j=0;
        }
        if(i<1){
            clearInterval(timeId);
        }
    },100);
    */

    //使用setTimeout代替setInterval
    function inner(){
        if(arr[j]>arr[j+1]){
            swap(arr,j,j+1);
        }
        j++;
        if(j>i-1){
            i--;
            j=0;
        }
        if(i>=1){
            //clearInterval(timeId);
            setTimeout(inner,100);
        }
    }
    setTimeout(inner,100);
  
    return arr;
} 

var bubbleSortBtn=document.getElementById('bubbleSort');
bubbleSortBtn.addEventListener('click',function(e){
    bubbleSort(queue.queue);
},false);

 

function selectionSort(arr){
    var maxIndex=arr.length,
        i=0,
        j=i+1,
        minIndex=i,
        timeId;
    /*
    for(i=0;i<=maxIndex-1;i++){
        minIndex=i;
        for(j=i+1;j<=maxIndex;j++){
            if(arr[j]<arr[minIndex]){
                minIndex=j;
            }
        }
        swap(arr,i,minIndex);
    }*/
    timeId=setInterval(function(){       
        
        if(arr[j]<arr[minIndex]){
            minIndex=j;
        }
        j++;
        if(j>maxIndex){//标志着一轮内层循环结束
            swap(arr,i,minIndex);
            i++;
            minIndex=i;
            j=i+1;
        }
        if(i>maxIndex-1){
            clearInterval(timeId);//标志着外层循环结束
        }
    },100);

    return arr;
}
var selectionBtn=document.getElementById('selectSort');
selectionBtn.addEventListener('click',function(e){

    selectionSort(queue.queue);
},false);

//插入排序
function insertSort(arr){
    var maxIndex=arr.length,
        i=1,
        j=0,
        tmp,
        timeId;
    /*利用逐个后移的方法
    for(i=1;i<=maxIndex;i++){
        tmp=arr[i];
        j=i-1;
        if(arr[j]>tmp){
            while(arr[j]>tmp&&j>=0){
                arr[j+1]=arr[j];
                j--;
            }
            arr[j+1]=tmp;
        }
    }*/
    /*利用前后交换的方法
    for(i=1;i<=maxIndex;i++){
        j=i-1;
        while(arr[j]>arr[j+1]&&j>=0){
            swap(arr,j,j+1);
            j--;
        }
    }*/

    /*使用分时函数来重写循环*/
    timeId=setInterval(function(){
        if(arr[j]>arr[j+1]&&j>=0){
            swap(arr,j,j+1);
            j--;
        }
        if(arr[j]<=arr[j+1]||j<0){
            i++;
            j=i-1;
        }

    },100);

    return arr;

}
var insertBtn=document.getElementById('insertSort');
insertBtn.addEventListener('click',function(){
    insertSort(queue.queue);
},false);

 