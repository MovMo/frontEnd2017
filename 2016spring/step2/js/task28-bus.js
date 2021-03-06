
var Bus=(function(){
    var commandMap={
        'fly':'0001',
        'stop':'0010',
        'destroy':'0011',
    };
    var failRate=0.1,
        passDuration=300,
        airships=[],
        screens=[];
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
        //注册显示屏幕
        registerScreen:function(screen){
            screens.push(screen); 
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
                        curMsgSystem.receiveMsg(Adapter.bitCommand2jsonCommand(bitMsg));
                    }
                    for(var i=0,len=screens.length;i<len;i++){
                        screens[i].receiveMsg(bitMsg);
                    }
                }
            },passDuration);
             
        },
        
    };   
    return Bus;
})();
