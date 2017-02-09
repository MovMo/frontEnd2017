 
/*
 * @Author: weibo Li
 * @Date:   2017-02-09
 */

var ConsoleUtil=(function(){
    var consoleList=getById('logList');
    var ConsoleUtil={
        log:function(text){
            var li=document.createElement('li');
            li.innerHTML=text;
            consoleList.appendChild(li);
        }
    };
    return ConsoleUtil;
})();