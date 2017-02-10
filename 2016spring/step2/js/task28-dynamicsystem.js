 
/*
 * @Author: weibo Li
 * @Date:   2017-02-09
 */

var DynamicSystem=(function(){
    var DEFAULT_FLYING_SPEED=10,
        DEFAULT_POWERCONSUMING_RATE=5;
    //动力系统由三种类型
    var DynamicModals={
        'qianjin':{
            name:'前进号',
            flyingSpeed:10,
            powerConsumingRate:5
        },
        'benteng':{
            name:'奔腾号',
            flyingSpeed:15,
            powerConsumingRate:7
        },
        'chaoyue':{
            name:'超越号',
            flyingSpeed:20,
            powerConsumingRate:9
        },
    };

    //飞船动力系统实现
    var DynamicSystem={
        init:function(airship,model){
            //动力系统所隶属的飞船
            this.airship=airship;
            this.model=DynamicModals[model];
            this.flyingSpeed=this.model.flyingSpeed||DEFAULT_FLYING_SPEED;
            this.powerConsumingRate=this.model.powerConsumingRate||DEFAULT_POWERCONSUMING_RATE;
            //飞行动作定时器
            this.renderTimer=null;
            //能源消耗定时器
            this.dischargingTimer=null;
            //起始角度都为0
            this.deg=0;
        },
        //飞行动作
         move:function(){
            var self=this;
            this.renderTimer=setInterval(function(){
                self.deg+=self.flyingSpeed;
                if(self.deg>=360){
                    self.deg=0
                }
                AnimUtil.updatePosition(self.airship.shipDom,self.deg);
            },100);
         },
         
         discharge:function(){
            var self=this;
            this.dischargingTimer=setInterval(function(){
                self.airship.power-=self.powerConsumingRate;
                if(self.airship.power<=0){
                    self.airship.power=0;
                    self.airship.stop();
                }

            },1000);
         },
        stopDischarge:function(){
            if(this.dischargingTimer){
                clearInterval(this.dischargingTimer);
                this.dischargingTimer=null;                
            }
        },
        //停止飞行动作
        stopMove:function(){
            if(this.renderTimer){
                clearInterval(this.renderTimer);
                this.renderTimer=null;                
            }
        }, 
        getName:function(key){
            return DynamicModals[key].name;
        }
    };
    return DynamicSystem;
})();

