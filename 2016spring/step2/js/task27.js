var DEFAULT_FLYING_SPEED=10,
    DEFAULT_POWER_CHARGING_RATE=0.02,
    DEFAULT_POWER_CONSUMING_RATE=0.05,
    ANIMINTERVAL=100,
    POWERBAR_WIDTH=120,
    POWERBAR_COLOR_GOOD='GREEN',
    POWERBAR_COLOR_MEDIUM='YELLOW',
    POWERBAR_COLOR_BAD='RED',
    POWERBAR_RATE_MEDIUM='0.7',
    POWERBAR_RATE_BAD='0.3',
    PLANET_RADIUS=105,
    ORBIT_BETWEEN_SPACE=40,
    AIRSHIP_HEIGHT=50,
    DEFAULT_FAILURE_RATE=0.3,
    BUS_FAILURE_RATE=0.1,
    DEFAULT_PASS_DURATION=1000,
    BUS_PASS_DURATION=300;

//动力系统
var dynamicModals={
    'qianjin':{
        flyingSpeed:10,
        powerConsumRate:0.05,
    },
    'benteng':{
        flyingSpeed:15,
        powerConsumRate:0.07,        
    },
    'chaoyue':{
        flyingSpeed:20,
        powerConsumRate:0.09,           
    }
};
//能源系统
var energyModals={
    'jinliang':{
        powerChargingRate:0.02,
    },
    'guangneng':{
        powerChargingRate:0.03,
    },
    'yongjiu':{
        powerChargingRate:0.04,            
    }
};



var AnimUtil={
    updatePower:function(powerBar,powerRate){
        var id=powerBar.id.split('_')[1];
        powerBar.style.width=powerRate*POWERBAR_WIDTH+'px';
        if(powerRate<POWERBAR_RATE_BAD){
            powerBar.style.backgroundColor=POWERBAR_COLOR_BAD;
        }else if(powerRate<POWERBAR_RATE_MEDIUM){
            powerBar.style.backgroundColor=POWERBAR_COLOR_MEDIUM;
        }else{
            powerBar.style.backgroundColor=POWERBAR_COLOR_GOOD;
        }
        ConsoleUtil.log('airship'+id+'当前电量：'+powerRate);
    },
    updatePostion(dom,deg){
        dom.style.transform='rotate('+deg+'deg)'; 
    }
};
var ConsoleUtil=(function(){
    var logList=document.getElementById('logList'),
        log=function(text){
            var li=document.createElement('li');
            li.innerHTML=text;
            logList.appendChild(li);
        };
    return {log:log};

})();

 

//飞船的实现
var Airship={
    init:function(id){
        this.state='init';
        this.dom=document.getElementById("airship_"+id);        
        this.id=+id;
        this.powerBar=document.getElementById('infoBar_'+this.id);
        this.commandPanel=document.getElementById('commandPanel_'+this.id);

        ConsoleUtil.log('飞船'+this.id+':init');     
        this.powerConsumRate=DEFAULT_POWER_CONSUMING_RATE;
        this.flyingSpeed=DEFAULT_FLYING_SPEED;
        this.powerChargingRate=DEFAULT_POWER_CHARGING_RATE;
    },
    //动力系统
    //负责飞行动画的渲染
    move:function(){        
        var self=this;
        this.renderTimer=setInterval(function(){
            self.deg+=self.flyingSpeed;            
            AnimUtil.updatePostion(self.dom,self.deg);
            if(self.deg>=360){
                self.deg=0;
            }            
        },100);
         ConsoleUtil.log('飞船'+this.id+':move');   
    },
    stopMove:function(){
        clearInterval(this.renderTimer);
         ConsoleUtil.log('飞船'+this.id+':stopMove');   
    },
    //能源系统
    charge:function(){
        var self=this;
        //每一秒钟增加2%
        this.chargeTimer=setInterval(function(){
            if(self.powerRate>=1){
                //如果电量是满的，那么返回
                return;
            }
            self.powerRate+=self.powerChargingRate;
            if(self.powerRate>=1){
                self.powerRate=1;
            }
            AnimUtil.updatePower(self.powerBar,self.powerRate);
        },1000);
        ConsoleUtil.log('飞船'+this.id+':charge');  
    },
    //
    stopCharge:function(){
        if(this.chargeTimer){
            clearInterval(this.chargeTimer);                    
        }
        ConsoleUtil.log('飞船'+this.id+':stopcharge');          
    },
    discharge:function(){
        var self=this;
        this.dischargeTimer=setInterval(function(){

            self.powerRate-=self.powerConsumRate;
            if(self.powerRate<=0){
                self.stop();
                self.powerRate=0;                
            } 
            AnimUtil.updatePower(self.powerBar,self.powerRate);
           
        },1000);
        ConsoleUtil.log('飞船'+this.id+':discharge');  
    },
    stopDischarge:function(){
        if(this.dischargeTimer){
            clearInterval(this.dischargeTimer);
            this.dischargeTimer=null;
        }
        ConsoleUtil.log('飞船'+this.id+':stopDischarge');          
    },

    //自爆系统
    destroyShip:function(){
        this.dom.style.display='none';
        this.powerBar.parentNode.style.display='none';
        this.commandPanel.style.display='none';
        ConsoleUtil.log('飞船'+this.id+':destroyShip');  
    }, 
    //设置动力系统，即设置飞行速率和耗能速率
    setDynamicModal:function(dynamicModal){
        this.flyingSpeed=dynamicModal.flyingSpeed;
        this.powerConsumRate=dynamicModal.powerConsumRate;
    },
    setEnergyModal:function(energyModal){
        this.powerChargingRate=energyModal.powerChargingRate;
    },
    create:function(){
        this.state='create';
        ConsoleUtil.log('飞船'+this.id+':create'); 
        this.dom.style.display='block';  
        this.dom.style.transform='rotate(0deg)';
        //飞行动画渲染的计时器
        this.renderTimer=null;
        //能源消耗的计时器
        this.dischargeTimer=null;
        //充电的计时器
        this.chargeTimer=null;
        this.deg=0;   
        //初始电量
        this.powerRate=1;     
        this.dom.style.marginTop=(-AIRSHIP_HEIGHT/2)+'px';
        this.dom.style.marginLeft=-(PLANET_RADIUS+ORBIT_BETWEEN_SPACE*this.id)+'px';
        //电量bar显示
        this.powerBar.parentNode.style.display='block';
        //控制台显示
        this.commandPanel.style.display='block';
        this.charge();        
    }, 
    fly:function(){
        this.state='fly';
        ConsoleUtil.log('飞船'+this.id+':fly'); 
        this.move();
        //耗电
        this.discharge();        
    }, 
    stop:function(){
        if(this.state!=='fly'){
            //只有在飞行状态下，才会停止
            return;
        }
        this.state='stop';
        ConsoleUtil.log('飞船'+this.id+':stop'); 
        this.stopMove();
        //停止耗电
        this.stopDischarge();        
    },
    destroy:function(){
        this.state='destroy';
        ConsoleUtil.log('飞船'+this.id+': destroy'); 
        this.stopMove();        
        this.destroyShip();
        this.stopCharge();
        this.stopDischarge(); 
       // shipFactory.removeShip(this.id);        
    }
 
}; 
 
//采用命令模式，将命令封装成对象
var Command={
    init:function(commandObj){
        this.airshipId=+commandObj.id;
        this.airship=shipFactory.airships[this.airshipId];
        this.commandText=commandObj.command;
    },
    execute:function(){
        if(this.airship.state!=this.commandText){
            ConsoleUtil.log('airship'+this.airshipId+'开始执行'+this.commandText+'命令');         
            this.airship[this.commandText].apply(this.airship,null);
        }      
    }

};
//BUS只能传递二进制，因此需要添加适配器

//BUS的实现
var Bus={
 
    //只能传递二进制命令
    sendCommand:function(commandBit){
        var failed=Math.random()<BUS_FAILURE_RATE?true:false,
            timer;
         
        timer=setTimeout(function(){
            if(failed){
                 ConsoleUtil.log(commandBit+'命令下发失败');
                 //重试
                 sendCommand(commandBit);
                 return;
            }else{
                ConsoleUtil.log(commandBit+'命令下发成功');
                var myCommand=Object.create(Command);
                myCommand.init(JSON.parse(Adapter.bit2json(commandBit)));
                myCommand.execute();       
            }              
        },BUS_PASS_DURATION);
    }  
};
 

var Adapter=(function(){
    var commandMap={'0001':'fly','0010':'stop','0011':'destroy'};

    var json2bit=function(commandJSON){

        var commandObj=JSON.parse(commandJSON),
            shipId=commandObj.id,
            commandText=commandObj.command,       
            result=(new Array(4).join('0')+(+shipId.toString(2))).slice(-4);
             
        for(var key in commandMap){
            if(commandMap[key]===commandText){
                result+=key;
                break;
            }
        }
        
        return result;        
    };

    var bit2json=function(commandBit){
        var rawId=commandBit.slice(0,4),
            rawCommand=commandBit.slice(4),
            realId=parseInt(rawId,10),
            realCommand=commandMap[rawCommand];
        return JSON.stringify({id:realId,command:realCommand});           
    };
    
    return{
        json2bit:json2bit,
        bit2json:bit2json
    }
})();

 
//创建飞船的工厂
var ShipFactory={
    init:function(){ 
        this.airships={}; 
       for(var i=1;i<=4;i++){
            this.airships[i]=Object.create(Airship);
            this.airships[i].init(i);
       }
    },
    createShip:function(energyModal,dynamicModal){
        var curship;
        for(var i=1;i<=4;i++){
            curship=this.airships[i]
            if(curship.state==='init'||curship.state==='destroy'){
                curship.setEnergyModal(energyModal);
                curship.setDynamicModal(dynamicModal);
                curship.create();
                return curship;
            }
        }
        ConsoleUtil.log('飞船数量已经达到四个，不能创建新飞船');  
    },
    
};

var shipFactory=Object.create(ShipFactory);
shipFactory.init();

 
//创建前的飞船型号选择
document.getElementById('createShip_btn').addEventListener('click',function(){
     
    var energyModal=energyModals[getCheckedRadioValue('energyModal')],
        dynamicModal=dynamicModals[getCheckedRadioValue('dynamicModal')];
    shipFactory.createShip(energyModal,dynamicModal);
},false);

//飞船控制事件
var btnHandler=function(e){
    //事件处理函数通过this绑定到事件发生的对象
    var tmp=e.target.id.split('_'),
        airshipId=tmp[1],
        commandText=tmp[0],
        commandJSON=JSON.stringify({id:airshipId,command:commandText});
    //     myCommand=Object.create(Command);
    // myCommand.init({id:airshipId,command:commandText});
    Bus.sendCommand(Adapter.json2bit(commandJSON));
};

//为控制台的按钮绑定处理事件,采用委托
var commandPanel=document.getElementById('command_list');
commandPanel.addEventListener('click',function(e){
    if(e.target.nodeName.toLowerCase()==='button'){
        btnHandler(e);
    }
});


