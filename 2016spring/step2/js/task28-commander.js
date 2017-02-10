var Commander={
    sendMsg:function(msg){
        //介质广播信息
        ConsoleUtil.log('Commander发布信息：'+msg);        
        Bus.publishMsg(Adapter.jsonCommand2bitCommand(msg));
    }
};