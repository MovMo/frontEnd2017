/*
 * @Author: weibo Li
 * @Date:   2017-02-09
 */
(function(){
    // var airship=Object.create(Airship);
    // airship.init(1,'qianjin','guangneng');
    // airship.create();
    // airship.msgSystem.receiveMsg(airship.msgSystem.bit2jsonAdapter('00010001'));    
    
    //能源，动力选型之后，创建新飞船的事件绑定
    
    getById('createShip_btn').addEventListener('click',function(e){
        var dynamicModal=getCheckedRadioValue('dynamicModal'),
            powerModal=getCheckedRadioValue('energyModal');
        AirshipFactory.create(dynamicModal,powerModal);

    },false);

    //控制面板部分的事件绑定
    function btnHandler(e){
        var tmp=e.target.split('_'),
            id=tmp[1],
            command=tmp[0],
            commandText=JSON.stringify({'id':id,'command':command});
        Commander.sendMsg(commandText);
    }

    getById('command_list').addEventListener('click',function(e){
        if(e.target.tagName.toLowerCase()==='button'){
            btnHandler(e);
        }
    });

})();

 