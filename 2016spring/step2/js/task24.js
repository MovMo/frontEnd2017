//树的广度优先和深度优先遍历
var BFindex=0;
var traversalStrategies={
    //广度优先遍历
    traversalBFS:function(node){
        if(node){
            visit(node);

            //console.log(0);
            if(node!==root){
                 this.traversalBFS(node.nextElementSibling);
             }           
            //上一步返回说明上一层已经遍历完成
            node=visitedList[BFindex++];
            //console.log(node.nextSibling.data);
            this.traversalBFS(node.firstElementChild);
        }
    },
    //深度优先遍历
    traversalDFS:function(node){
        if(node){
            //说明是叶子节点
            visit(node);
            for(var i=0,len=node.children.length;i<len;i++){
                this.traversalDFS(node.children[i]);
            }
        }
    }
};
var visitedList=[],
    root=document.getElementById('root'),
    DFSBtn=document.getElementById('DFS-btn'),
    BFSBtn=document.getElementById('BFS-btn');
function visit(node){
    visitedList[visitedList.length]=node;
    console.log(node.firstChild.data.trim());
}

function markColor(){
    var i=0,timer;
    visitedList[i].style.background='pink';
    timer=setInterval(function(){
        if(i>=visitedList.length-1){
            clearInterval(timer);
        }else{
            i++;
            visitedList[i-1].style.background='white';
            visitedList[i].style.background='pink';
        }
    },500);
}
function reset(){
    var i,len;
    for(i=0,len=visitedList.length;i<len;i++){
        visitedList[i].style.background='white';
    }
    visitedList=[];
}
DFSBtn.addEventListener('click',function(e){   
    reset();
    traversalStrategies.traversalDFS(root);
    markColor();
},false);
BFSBtn.addEventListener('click',function(e){
    reset();    
    traversalStrategies.traversalBFS(root);
    markColor();
},false);


//查询功能的实现
var keywordInput=document.getElementById('keyword'),
    queryBtn=document.getElementById('query-btn');
function search(keyword){
    var i=0,
        timer,
        isFound=false;
    //if(visitedList[0].firstChild.data.trim().toLowerCase()!==keyword.toLowerCase()){
    visitedList[0].style.background='pink';
    //}
    timer=setInterval(function(){
        if(i>=visitedList.length-1){
            if(!isFound){
                alert('查找不到对应项！');
            }
            clearInterval(timer);

        }else{
            i++;             
            if(visitedList[i-1].firstChild.data.trim().toLowerCase()===keyword.toLowerCase()){
                //查找到的话使用蓝色标识
                visitedList[i-1].style.background='blue';
                isFound=true;
            }else{
                visitedList[i-1].style.background='#fff';               
            }
            visitedList[i].style.background='pink';
        }
    },500);
}
queryBtn.addEventListener('click',function(){
    reset();
    traversalStrategies.traversalDFS(root);
    search(keywordInput.value);
},false);
 


//删除和添加子节点的功能
var selectedNode,
    delBtn=document.getElementById('delete-btn'),
    addBtn=document.getElementById('add-btn'),
    contentInput=document.getElementById('content'),
    divs=root.getElementsByTagName('div');
root.addEventListener('click',function(e){
    var target=e.target;
    if(target.nodeName.toLowerCase()==='div'){
        root.style.backgroundColor='#fff';
        for(var i=0,len=divs.length;i<len;i++){
            divs[i].style.backgroundColor='#fff';
        }
        //选中的话使用黄色背景进行标识
        target.style.backgroundColor='yellow';
        selectedNode=target;
    }
},false);

delBtn.addEventListener('click',function(e){
    if(selectedNode){
        selectedNode.parentNode.removeChild(selectedNode);
    }
},false);

addBtn.addEventListener('click',function(e){
    var value=contentInput.value;
    if(!value){
        alert('请输入子节点内容！');
        return;
    }
    if(!selectedNode){
        alert('请选择节点!');
        return;
    }
    var div=document.createElement('div');
    div.innerHTML=value;
    div.style.backgroundColor='#fff';
    selectedNode.appendChild(div);
},false);

task24.js