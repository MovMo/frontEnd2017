var FLYINGSPEED=10,
    POWER_CHARGING_RATE=0.02,
    POWER_CONSUMING_RATE=0.05,
    ANIMINTERVAL=100,
    POWERBAR_WIDTH=120,
    POWERBAR_COLOR_GOOD='GREEN',
    POWERBAR_COLOR_MEDIUM='YELLOW',
    POWERBAR_COLOR_BAD='RED',
    POWERBAR_RATE_MEDIUM='0.7',
    POWERBAR_RATE_BAD='0.3',
    PLANET_RADIUS=105,
    ORBIT_BETWEEN_SPACE=40,
    AIRSHIP_HEIGHT=50;

var logList=document.getElementById('logList');

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

var ConsoleUtil={
    
    log:function(text){
        var li=document.createElement('li');
        li.innerHTML=text;
        logList.appendChild(li);
    }
};

//飞船的实现
var Airship={
    init:function(domId){
        this.state='stop';
        this.dom=document.getElementById(domId);        
        this.id=+domId.split('_')[1];
        this.powerBar=document.getElementById('infoBar_'+this.id);
        //飞行动画渲染的计时器
        this.renderTimer=null;
        //能源消耗的计时器
        this.dischargeTimer=null;
        //充电的计时器
        this.chargeTimer=null;
        this.deg=0;   
        //初始电量
        this.powerRate=1;
        ConsoleUtil.log('飞船'+this.id+':init');     
    },
    //动力系统
    //负责飞行动画的渲染
    move:function(){        
        var self=this;
        this.renderTimer=setInterval(function(){
            self.deg+=FLYINGSPEED;            
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
            self.powerRate+=POWER_CHARGING_RATE;
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

            self.powerRate-=POWER_CONSUMING_RATE;
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
        ConsoleUtil.log('飞船'+this.id+':destroyShip');  
    }, 

    create:function(){
        this.state='create';
        ConsoleUtil.log('飞船'+this.id+':create'); 
        this.dom.style.display='block';         
        this.dom.style.marginTop=(-AIRSHIP_HEIGHT/2)+'px';
        this.dom.style.marginLeft=-(PLANET_RADIUS+ORBIT_BETWEEN_SPACE*this.id)+'px';
        this.powerBar.parentNode.style.display='block';
        //每一次新建，飞船都出现在原始位置
        //开启充电装置，除非销毁，否则太阳能充电操作一直进行中
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
        this.state='stop';
        ConsoleUtil.log('飞船'+this.id+':stop'); 
        this.stopMove();
        //停止耗电
        this.stopDischarge();        
    },
    destroy:function(){
        this.state='destroy';
        ConsoleUtil.log('飞船'+this.id+': destroy'); 
        this.destroyShip();
        this.stopCharge();
        this.stopDischarge();         
    }
 
};
var airships=[];
for(var i=0;i<4;i++){
    airships[i]=Object.create(Airship);
    airships[i].init('airship_'+(i+1));
}
 
//采用命令模式，将命令封装成对象
var Command={
    init:function(commandObj){
        this.airshipId=+commandObj.id;
        this.airship=airships[this.airshipId-1];
        this.commandText=commandObj.command;
    },
    execute:function(){
        if(this.airship.state!=this.commandText){
            ConsoleUtil.log('airship'+this.airshipId+'开始执行'+this.commandText+'命令');         
            this.airship[this.commandText].apply(this.airship,null);
        }      
    }

};
 
//Mediator的实现
var Mediator={
    //信息传递有30%的失败率
    //信息传递的延迟为1s
    sendCommand:function(command){
        var failed=Math.random()<0.3?true:false,
            timer;
        if(failed){
            ConsoleUtil.log('airship'+command.airshipId+'的'+command.commandText+'命令下发失败');
            return;
        }
        ConsoleUtil.log('airship'+command.airshipId+'的'+command.commandText+'命令下发成功');
        
        timer=setTimeout(function(){
            command.execute();        
        },1000);
    }
};

var btnHandler=function(e){
    //事件处理函数通过this绑定到事件发生的对象
    var tmp=e.target.id.split('_'),
        airshipId=tmp[1],
        commandText=tmp[0],
        myCommand=Object.create(Command);
    myCommand.init({id:airshipId,command:commandText});
    Mediator.sendCommand(myCommand);
};

//为控制台的按钮绑定处理事件,采用委托
var commandPanel=document.getElementById('command_list');
commandPanel.addEventListener('click',function(e){
    if(e.target.nodeName.toLowerCase()==='button'){
        btnHandler(e);
    }
});

