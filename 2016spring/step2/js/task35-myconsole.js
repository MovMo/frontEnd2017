var MyConsole=(function(){
    var rowList=getById('rowList'),
        consoleTa=getById('commandTa');
    //textarea左侧有一列可以显示当前行数的列（代码行数列），列数保持和textarea中一致
    //当textarea发生上下滚动时，代码行数列同步滚动
    consoleTa.addEventListener('keyup',function(e){

    },false);
    consoleTa.addEventListener('scroll',function(e){
        console.log(scroll);
    },false);
})();