var Screen=(function(){
    var showTabel=getById('screen'),
        //接收BUS广播的信息
        receiveMsg=function(bitMsg){
            var msgObj=JSON.parse(dcMsg(bitMsg));
            showMsg(msgObj);
        },
        dcMsg=function(bitMsg){             
            return Adapter.bitState2jsonState(bitMsg);
        },
        showMsg=function(msgObj){
            var id=msgObj.id,
                state=msgObj.state,
                power=+msgObj.power,                
                curTr=showTabel.rows[id-1];
            curTr.cells[0].innerHTML=id+'号';
            curTr.cells[3].innerHTML=state;
            curTr.cells[4].innerHTML=power+'%';
        };
    return {receiveMsg:receiveMsg}

})();