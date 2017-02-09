var MsgSystem=(function(){
    var commandMap={        
        '0001':'fly',
        '0010':'stop',
        '0011':'destroy',
    };
    var MsgSystem={
        init:function(airship){
            this.airship=airship;
            this.sendTimer=null;
        },
        //msg是json格式的命令字符
        receiveMsg:function(msg){
            if(!msg){
                return;
            }
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
            if(bitMsg.length!==8){
                return;
            }
            var id=parseInt(bitMsg.slice(0,4),2),
                command=commandMap[bitMsg.slice(4)];
            return JSON.stringify({'id':id,'command':command});
        },
        //发送自身的状态，把飞船自身标示，飞行状态，能量编码成一个16位的二进制串
        sendMsg:function(){
            var result='';
            //自身标识位置
            result+=((new Array(4)).join('0')+this.airship.id.toString(2)).slice(-4);
            //飞行状态位
            for(var key in commandMap){
                if(this.airship.state===commandMap[key]){
                    result+=key;
                }
            }
            //飞机的能量位
            result+=((new Array(8)).join('0')+(+this.airship.power.toString(2))).slice(-8);  
            Bus.publishMsg(result);          

        },
        periodicSend:function(){
            var self=this;
            this.sendTimer=setInterval(function(){
                self.sendMsg();                
            },1000);
        },
        stopPeriodicSend:function(){
            if(this.sendTimer){
                clearInterval(this.sendTimer);
                this.sendTimer=null;
            }
        }
    };   
    return MsgSystem; 
})();
