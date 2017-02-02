var TreeNode={
    init:function(dom){
        this.dom=dom;
        this.data='';//便于查找使用
        this.uls=this.dom.getElementsByTagName('ul');//存储该项下的二级菜单
       // this.childrenList=this.uls.length>0?this.this.uls[0]:undefined;
        this.arrowDom=this.dom.firstElementChild;//存储箭头对应的DOM元素
        this.childs=[];//子元素数组，元素是TreeNode类型，在添加的时候引用
        this.parent=null;//在addChild的时候复制
        this.operateDiv=this.dom.querySelector('.operate');//增加，删除的操作图标
        this.addEventListener();

    },
    addEventListener:function(){
        //折叠和隐藏
        this.dom.addEventListener('click',this.clickHandler.bind(this));
        this.dom.addEventListener('mouseover',this.mouseoverHandler.bind(this));
        this.dom.addEventListener('mouseout',this.mouseoutHandler.bind(this));
    },
    clickHandler:function(e){
        var target=e.target,
            name=target.nodeName.toLowerCase();
        if(name==='li'||name==='i'){
            //说明点击的是箭头或者li中的非图标部分
            this.toggle();
            
        }else if(name==='span'){
            if(target.className==='add'){
                //增加节点
                var text=prompt('请输入新节点的值：');
                if(!text){
                    alert('节点值不能为空');
                }else{
                    this.addChild(text);
                }
            }else if(target.className==='delete'){
                 //删除节点,以及其父元素childs中的元素
                 this.deleteNode();
                 //考虑这种情况，如果子节点列表ul中只有一个li，那么这么做只是删除了li，还剩余一个空的ul
                 this.dom.parentNode.removeChild(this.dom);


            }
        }
        e.stopPropagation();
        //节点的添加和删除
    },
    mouseoverHandler:function(e){
        this.operateDiv.style.visibility='visible';
        e.stopPropagation();
    },
    mouseoutHandler:function(e){
        this.operateDiv.style.visibility='hidden';
        e.stopPropagation();
    },
    toggle:function(){
        if(this.isLeaf()){
            return;
        }
        if(this.isFolder()){
            this.spread();
        }else{
            this.folder();
        }       
    },
    isLeaf:function(){
        
       return this.childs.length===0;
    },
    isFolder:function(){
        return this.uls&&this.uls[0].style.display==='none';
    },
    //折叠
    folder:function(){
        if(this.isLeaf()){
            return;
        }         
        this.uls[0].style.display='none';
        //箭头演示转换为向右
        this.renderArrow('right');

    },
    //展开
    spread:function(){
        if(this.isLeaf()){
            return;
        }
        this.uls[0].style.display='block';
        this.renderArrow('down');
    },
    //转换箭头的样式
    renderArrow:function(direction){
        if(direction==='down'){
            this.arrowDom.className='down-arrow';
        }else if(direction==='right'){
            this.arrowDom.className='right-arrow';
        }else if(direction==='empty'){
            this.arrowDom.className='empty-arrow';
        }
    },
    //搜索到的结果，高亮显示
    toHighLight:function(){
        this.dom.style.color='red';
    },
    //删除高亮样式
    delHighLight:function(){
        this.dom.style.color='#6898C2';
    },  
    addChild:function(text){
        //增加新的节点
        if(!text){
            alert('请输入子节点的内容!');
            return;
        }

        var li,newNode;
         
        if(this.uls.length===0){
            //需要新建一个ul
            var ul=document.createElement('ul');
            li=document.createElement('li');
            li.innerHTML='<i class="empty-arrow"></i>'+text+'<div class="operate"><span class="add"></span><span class="delete"></span></div>';
            ul.appendChild(li);
            this.dom.appendChild(ul);
             
        }else{
            li=document.createElement('li'),newNode;
            li.innerHTML='<i class="empty-arrow"></i>'+text+'<div class="operate"><span class="add"></span><span class="delete"></span></div>';
            this.uls[0].appendChild(li);
        }
        newNode=Object.create(TreeNode);
        newNode.init(li);
        newNode.parent=this;
        newNode.data=text;
        this.childs[this.childs.length]=newNode;
        //自身的样式展开
        this.spread();  
        return this;  
    },
    //在以该节点为根的子树中进行查找
    search:function(text){
        //深度优先遍历
        var i,len,parent;
        if(this.data===text){
            this.toHighLight();
            parent=this.parent;
            if(parent&&parent.isFolder()){
                parent.spread();
            }
        }
        for(i=0,len=this.childs.length;i<len;i++){
            this.childs[i].search(text);
        }

    },
    //删除自身以及对应的子树
    //这部分的逻辑有点多，删除之后还需要判断母节点，是否成为了叶子节点
    deleteNode:function(){
        //递归删除子树对应的childs数组       
        var  i,len;
       // console.log(this.childs.length);
       //注意这里不能使用len缓存this.childs.length,因为随着节点删除，this.childs.length可能发生变化
        for(i=0;i<this.childs.length;i++){
            this.childs[i].deleteNode();
        }
        var parent=this.parent,
            parentChilds=parent.childs;         
        //修改childs数组
        for(i=0,len=parentChilds.length;i<len;i++){
            if(parentChilds[i]===this){
                parentChilds.splice(i,1);
                break;
            }
        }
        if(parent.childs.length===0){
            parent.renderArrow('empty');
        }    
    },
    //清楚该节点及其子节点的样式
    reset:function(){
        this.delHighLight();
        for(var i=0,len=this.childs.length;i<len;i++){
            this.childs[i].reset();
        }
    },
};
var rootNode=Object.create(TreeNode),
    root=document.getElementById('root');
rootNode.init(root);
rootNode.data='前端工程师';
rootNode.addChild('技术').addChild('IT公司').addChild('谈笑风生');
rootNode.childs[0].addChild('HTML5').addChild('CSS3').addChild('javascript').addChild('php').addChild('Node.js').folder();
rootNode.childs[0].childs[4].addChild('javascript').folder();
rootNode.childs[1].addChild('百度').addChild('腾讯').addChild('大众点评').folder();
rootNode.childs[2].addChild('身经百战').addChild('吟两句诗').folder();
rootNode.childs[2].childs[1].addChild('举头望明月').folder();

//搜索功能的实现
var keywordInput=document.getElementById('keyword'),
    queryBtn=document.getElementById('query-btn'),
    clearBtn=document.getElementById('clear-btn');


queryBtn.addEventListener('click',function(e){    
    var keyword=keywordInput.value.trim();
    if(!keyword){
        alert('请输入搜索关键词！');
    }
    rootNode.reset();
    rootNode.search(keyword);
},false);

//清楚搜索样式功能实现
clearBtn.addEventListener('click',function(e){
    rootNode.reset();
},false);
 