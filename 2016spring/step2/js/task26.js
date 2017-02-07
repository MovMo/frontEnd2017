var FLYINGSPEED=10,
    POWER_CHARGING_RATE=0.2,
    POWER_CONSUMING_RATE=0.5,
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
        powerBar.style.width=powerRate*POWERBAR_WIDTH+'px';
        if(powerRate<POWERBAR_RATE_BAD){
            powerBar.style.backgroundColor=POWERBAR_COLOR_BAD;
        }else if(powerRate<POWERBAR_RATE_MEDIUM){
            powerBar.style.backgroundColor=POWERBAR_COLOR_MEDIUM;
        }else{
            powerBar.style.backgroundColor=POWERBAR_COLOR_GOOD;
        }
        ConsoleUtil.log('当前电量：'+powerRate);
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
    //信号接收系统
    receiveMsg:function(){},
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
        console.log((-AIRSHIP_HEIGHT)+'px');
        console.log(-(PLANET_RADIUS+ORBIT_BETWEEN_SPACE*this.id)+'px');
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

//测试飞机的各项功能
var airship1=Object.create(Airship);
airship1.init('airship_1');

 
 

