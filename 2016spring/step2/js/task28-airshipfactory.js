var AirshipFactory=(function(){
    var  airships=[];
    for(var i=1;i<=4;i++){
        airships[i-1]=Object.create(Airship);
        airships[i-1].init(i);        
    }
    var createAirship=function(dynamicModal,powerModal){
        for(var i=1;i<=4;i++){
            if(airships[i-1].state==='init'||airships[i-1].state==='destroy'){
                airships[i-1].create(dynamicModal,powerModal);
                ConsoleUtil.log('创建飞船'+i);
                return airships[i-1];
            }
        }
    };
    return {'createAirship':createAirship}
})();