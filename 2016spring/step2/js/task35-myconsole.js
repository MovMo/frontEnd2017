var UserIn=(function(){
    var rowList=getById('rowList'),
        consoleTa=getById('commandTa'),
        regWrap=/\n/,         
        commands=[/^go\s[\d+]$/,/^turn[Left|Right|Bottom]$/];//有效的命令格式
   
    function addNum(){
        var value=consoleTa.value,
            len=value.split(regWrap).length,
            curStr='';
        for(var i=1;i<=len;i++){
            curStr+='<div>'+i+'</div>';
        }
        rowList.innerHTML=curStr;
    }
    //textarea左侧有一列可以显示当前行数的列（代码行数列），列数保持和textarea中一致
    //当textarea发生上下滚动时，代码行数列同步滚动
    consoleTa.addEventListener('keyup',function(e){
        addNum();
    },false);
    consoleTa.addEventListener('scroll',function(e){
        rowList.scrollTop=this.scrollTop;
    },false);
    var UserIn={
        init:function(piece){
            this.piece=piece;
        },
        execute:function(){
            var value=consoleTa.value,
                commands=value.split(/\r\n/);
        }
    };

})();
