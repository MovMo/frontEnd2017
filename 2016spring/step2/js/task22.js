var strategies={
    preorderTraversal:function(node){
        if(node){
            visit(node);
            //setTimeout(function(){
            strategies.preorderTraversal(node.firstElementChild);  
            strategies.preorderTraversal(node.lastElementChild);  
            //},1000);
       
        }
    },
    inorderTraversal:function(node){
        if(node){
            strategies.inorderTraversal(node.firstElementChild);
            visit(node);
            strategies.inorderTraversal(node.lastElementChild);
        }
    },
    postorderTraversal:function(node){
        if(node){
            strategies.postorderTraversal(node.firstElementChild);            
            strategies.postorderTraversal(node.lastElementChild);
            visit(node);
        }
    },
};
//var visitedNode=[],
var root=document.getElementById('root'),
    preBtn=document.getElementById('pre-btn'),
    inBtn=document.getElementById('in-btn'),
    postBtn=document.getElementById('post-btn'),
    visitedList=[];
//遍历实现
//使用数组记录遍历的顺序
function visit(node){
    visitedList.push(node);
}

function markColor(){
    var i=0,
        timer;
    visitedList[0].style.background='pink';
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
preBtn.addEventListener('click',function(e){
    reset();
    strategies.preorderTraversal(root);
    markColor();
},false);


inBtn.addEventListener('click',function(e){
    reset();
    strategies.inorderTraversal(root);
    markColor();
},false);

postBtn.addEventListener('click',function(e){
    reset();
    strategies.postorderTraversal(root);
    markColor();
},false);
 