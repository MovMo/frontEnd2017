var Commander={
    sendMsg:function(msg){
        //介质广播信息
        ConsoleUtil.log('Commander发布信息：'+msg);
        Bus.publishMsg(Bus.json2bitAdapter(msg));
    }
};