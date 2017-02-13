var UserIn=(function(){
    var rowList=getById('rowList'),
        consoleTa=getById('commandTa'),
        regWrap=/\n/,         
        regCommands=var commands=[/^(go)(?:\s+(\d+))?$/,/^turn[Left|Right|Bottom]$/,/^move[Left|Right|Bottom](:\s+(\d+))?$/,/^tra[Left|Right|Bottom](:\s+(\d+))?$/];//有效的命令格式
   
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
                commands=value.split(/\r\n/),
                i,len,regResult,command,times,index;
            for(i=0,len=commands.length;i<len;i++){                 
                regResult=valid(commands[i]);
                if(regResult===false){
                    //呈现错误的提示
                    rowList.children[i].className='error';
                }else{
                    index=0;
                    command=result[1];
                    num=command[2];
                    if(typeof num==='number'){
                        setInterval(function(){
                            index++;
                            piece[command].apply(piece);
                        },500);
                    }
                     
                }
            }
        },
        valid:function(commandText){
            var regResult;
            for(var i=0,len=regCommands.length;i<len;i++){
                if((result=commandText.match(regCommands[i]))!=null){
                    return result;
                }
            }
            return false;
        },
    };

})();
