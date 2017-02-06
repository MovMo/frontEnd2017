var FLYINGSPEED=10,
    CHARGINGRATE=0.2,
    ENERGYCONSUMPINGRATE=0.05,
    LOWENERGYCOLOR='RED',
    MIDENERGYCOLOR='YELLOW',
    HIGHENERGYCOLOR='GREEN',
    LOWENERGYRATE=0.3,
    MIDENERGYRATE=0.7,
    ANIMINTERVAL=100; 




var Airship={
    init:function(id){
        this.state='init';//飞机有四个状态：初始化，飞行，停止，销毁
        //对应的dom元素
        this.dom=document.getElementById(id);
        //console.log(this.dom);
        this.deg=0;//起始的飞行角度
        this.timer=null;//动画的计时器
        this.dom.style.display='block';
        this.energy=1;//刚初始化的时候，能源为100%

    },
    //能源系统，提供能源，并且在宇宙中通过太阳能充电
    erergySystem:{
        //每秒钟通过太阳能充电（每秒增加2%）
        charge:function(){
            var timer;
            if(this.state==='destory'){
                clearInterval(timer);
            }
            timer=setInterval(function(){
                this.energy+=chargeRate;
                if(this.energy>=1){
                    this.energy=1;
                }
            },1000); 
        },
        //飞行过程中按照一定的速率消耗能源（每秒钟消耗5%)
        disCharge:function(){
            var timer,
                self=this;
            if(this.state!=='fly'){
                clearInterval(timer);
            }
            timer=setInterval(function(){
                this.energy+=ENERGYCONSUMPINGRATE;
                if(this.energy<=0){
                    //销毁
                    clear(timer);
                    clear(self.timer);
                    this.destory();
                }
            },1000);
        }
    },
    //动力系统，可以完成飞行和停止飞行两个行为
    dynamicSystem:{
        fly:function(){             
            this.state='fly';    
            var self=this;         
            this.timer=setInterval(function(){                
                self.deg+=FLYINGSPEED;                              
                self.dom.style['transform']='rotate('+self.deg+'deg)';               
                if(self.deg>=360){
                    self.deg=0;
                }
             
            },ANIMINTERVAL);
        },
        stop:function(){
            this.state='stop';
            clearInterval(this.timer);
        }
    },
     
    
    //信号接收处理系统
    singalSystem:function(){},
    //自爆系统
    destructSystem:{
        destory:function(){
            this.dom.style.display='none';
        }
    },

};

var airship1=Object.create(Airship);
airship1.init('airship1');
 