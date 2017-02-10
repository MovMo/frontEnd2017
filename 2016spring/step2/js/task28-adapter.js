var Adapter=(function(){
    var commandMap={        
        '0001':'fly',
        '0010':'stop',
        '0011':'destroy',
    };
    //使用字符paddingchar填充字符串str，达到指定的长度length
    var padding=function(str,paddingChar,length){
        return ((new Array(length)).join(paddingChar)+str).slice(-length);
    };
    var hex10Tohex2=function(num){
        return num.toString(2);
    };
    var hex2Tohex10=function(num){
        return parseInt(num,2);
    };
    //将json格式的命令转化为二进制
    var jsonCommand2bitCommand=function(jsonMsg){
        var msgObj=JSON.parse(jsonMsg),
            id=+msgObj.id,
            command=msgObj.command,
            result=padding(hex10Tohex2(id),'0',4);
        for(var key in commandMap){
            if(commandMap[key]===command){
                result+=key;
                break;
            }
        }
        return result;        
    };
    //将二进制形式的命令转换为json格式
    var bitCommand2jsonCommand=function(bitMsg){
        if(bitMsg.length!==8){
            return;
        }
        var id=parseInt(bitMsg.slice(0,4),2),
            command=commandMap[bitMsg.slice(4)];
        return JSON.stringify({'id':id,'command':command});        
    };
    //将json形式的状态信息转换为二进制形式
    var jsonState2bitState=function(jsonState){
        var stateObj=JSON.parse(jsonState),
            id=+stateObj.id,
            state=stateObj.state,
            power=+stateObj.power;
            result=padding(id.toString(2),'0',4);
        //飞行状态位
        for(var key in commandMap){
            if(state===commandMap[key]){
                result+=key;
                break;
            }
        }
        //飞机的能量位
        result+=padding(power.toString(2),'0',8);
        return result;
    };
    //将二进制的状态信息转换为json格式
    var bitState2jsonState=function(bitMsg){
        var bitId=bitMsg.slice(0,4),
            bitState=bitMsg.slice(4,8),
            bitPower=bitMsg.slice(8),  
            result='';

            result={
                id:+hex2Tohex10(bitId),
                state:commandMap[bitState],
                power:+hex2Tohex10(bitPower)
            };
        return JSON.stringify(result);
    };
    return {
        'jsonState2bitState':jsonState2bitState,
        'bitState2jsonState':bitState2jsonState,
        'jsonCommand2bitCommand':jsonCommand2bitCommand,
        'bitCommand2jsonCommand':bitCommand2jsonCommand,
    }
})();