var MsgSystem=(function(){
    var commandMap={
        '0001':'fly',
        '0010':'stop',
        '0011':'destroy',
    };
    var MsgSystem={
        init:function(airship){
            this.airship=airship;
        },
        //msg是json格式的命令字符
        receiveMsg:function(msg){
            var msgObj=JSON.parse(msg),
                id=msgObj.id,
                command=msgObj.command;
            if(id==this.airship.id){
                //执行对应的操作
                ConsoleUtil.log('airship'+this.airship.id+':接收到并开始执行指令'+msg);
                this.airship[command].apply(this.airship,null);
            }
        },
        bit2jsonAdapter:function(bitMsg){
            var id=parseInt(bitMsg.slice(0,4),2),
                command=commandMap[bitMsg.slice(4)];
            return JSON.stringify({'id':id,'command':command});
        },
        publishMsg:function(){}
    };   
    return MsgSystem; 
})();
