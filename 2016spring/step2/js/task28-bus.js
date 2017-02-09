
var Bus=(function(){
    var commandMap={
        'fly':'0001',
        'stop':'0010',
        'destroy':'0011',
    };
    var failRate=0.1,
        passDuration=300,
        airships=[];
    var Bus={         
        registerShip:function(airship){
            airships.push(airship);
        },
        removeShip:function(airship){
            for(var i=0,len=airships.length;i<len;i++){
                if(airships[i]===airship){
                    airships.slice(i,1);
                }
            }
        },
        publishMsg:function(bitMsg){         

             
            var timer=setTimeout(function(){
                var isFailed=Math.random()<failRate?true:false;
                if(isFailed){
                    ConsoleUtil.log('广播信息'+bitMsg+'失败');
                }else{
                    ConsoleUtil.log('广播信息'+bitMsg+'成功');
                    //接收方可能是飞船，也可能是其他
                    for(var i=0,len=airships.length;i<len;i++){
                        var curMsgSystem=airships[i].msgSystem;
                        curMsgSystem.receiveMsg(curMsgSystem.bit2jsonAdapter(bitMsg));
                    }
                }
            },passDuration);
             
        },
        //将指挥官的json指令转换能够广播的二进制指令
        json2bitAdapter:function(jsonMsg){
            var msgObj=JSON.parse(jsonMsg),
                id=+msgObj.id,
                command=msgObj.command,
                result=(new Array(4).join('0')+id.toString(2)).slice(-4);
            result+=commandMap[command];
            return result;
        }
    };   
    return Bus;
})();
