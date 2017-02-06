var FLYINGSPEED=10,
    CHARGINGRATE=0.0004,
    ENERGYCONSUMPINGRATE=0.001,
    ANIMINTERVAL=100,
    POWERBAR_WIDTH=120,
    POWERBAR_COLOR_GOOD='GREEN',
    POWERBAR_COLOR_MEDIUM='YELLOW',
    POWERBAR_COLOR_BAD='RED',
    POWERBAR_RATE_MEDIUM='0.7',
    POWERBAR_RATE_BAD='0.3';

var AnimUtil={
    updatePower:function(powerBar,powerRate){
        powerBar.style.width=powerRate*POWERBAR_WIDTH+'px';
        if(powerRate<POWERBAR_RATE_BAD){
            powerBar.style.background=POWERBAR_COLOR_BAD;
        }else if(powerRate<POWERBAR_COLOR_MEDIUM){
            powerBar.style.background=POWERBAR_RATE_MEDIUM;
        }else{
            powerBar.style.background=POWERBAR_COLOR_GOOD;
        }
    }
};



var Airship={
    init:function(domId){
        this.state='init';//飞机有四个状态：初始化，飞行，停止，销毁
        //对应的dom元素
        this.dom=document.getElementById(domId);
        this.id=domId.split('_')[1];
        this.powerBar=document.getElementById('infoBar_'+this.id);
        //console.log(this.dom);
        this.deg=0;//起始的飞行角度
        this.renderTimer=null;//动画的计时器
        this.chargeTimer=null;//太阳能充电的计时器
        this.dischargeTimer=null;//消耗能量的计时器
        this.power=1;//刚初始化的时候，能源为100%
        this.factorySystem.create();
    },
    //能源系统，提供能源，并且在宇宙中通过太阳能充电
    erergySystem:{
        //每秒钟通过太阳能充电（每秒增加2%）
        charge:function(){
            var  self=this;
            this.chargeTimer=setInterval(function(){                
                self.power+=CHARGINGRATE;
                if(self.power>=1){
                    //clearInterval(self.chargeTimer);
                    self.power=1;                    
                }
                AnimUtil.updatePower(self.powerBar,self.energy);                                

            },20);
        },
        //飞行过程中按照一定的速率消耗能源（每秒钟消耗5%)
        disCharge:function(){
            var self=this;            
            this.disChargeTimer=setInterval(function(){
                self.power-=ENERGYCONSUMPINGRATE;
                if(self.power<=0){
                    //停止而非销毁
                    self.dynamicSystem.stop();
                    return;
                }
                AnimUtil.updatePower(self.powerBar,self.power);
            },20);
        }
    },
    //动力系统，可以完成飞行和停止飞行两个行为
    dynamicSystem:{
        fly:function(){ 
             
            var self=this;         
            this.renderTimer=setInterval(function(){                
                self.deg+=FLYINGSPEED;                              
                self.dom.style['transform']='rotate('+self.deg+'deg)';               
                if(self.deg>=360){
                    self.deg=0;
                }
             
            },ANIMINTERVAL);
        },
        stop:function(){           
            clearInterval(this.renderTimer);
        }
    },
     
    
    //信号接收处理系统
    singalSystem:{},
    //负责创建与销毁
    factorySystem:{
        create:function(){
            this.dom.style.display='block';
            this.powerBar.parentNode.style.display='block'; 
            //一旦创建，只要不销毁，就一直在充电
            this.energySystem.charge();  
        },
        destory:function(){
            this.dom.style.display='none';
            this.powerBar.parentNode.style.display='none';
            clearInterval(self.chargeTimer);
            clearInterval(self.dischargeTimer);
        },
    },
    stateManager:{
        var self=this,
            state={
            'fly':function(){
                self.state='fly';                
                self.energySystem.disCharge();
                self.dynamicSystem.fly();
            },
            'stop':function(){
                self.state='stop';
                self.dynamicSystem.stop();
            },
            'destory':function(){
                self.state='destory';
                self.factorySystem.destory();
            },
        };

    },

};



var airship1=Object.create(Airship);
airship1.init('airship1');
 