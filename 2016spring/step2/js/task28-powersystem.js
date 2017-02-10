/*
 * @Author: weibo Li
 * @Date:   2017-02-09
 */

var PowerSystem=(function(){
    var DEFAULT_POWER_CHARGING_RATE=2;
    var powerModals={
        'jinliang':{
            name:'前进型',
            powerChargingRate:2,
        },
        'guangneng':{
            name:'光能型',
            powerChargingRate:3,
        },
        'yongjiu':{
            name:'永久型',
            powerChargingRate:5,
        }
    };
    var powerSystem={
        init:function(airship,powerModal){
            this.airship=airship;
            this.powerModal=powerModals[powerModal];
            this.powerChargingRate=this.powerModal.powerChargingRate;
            this.chargeTimer=null;
        },
        //充电
        charge:function(){
            var self=this;
            this.chargeTimer=setInterval(function(){
                self.airship.power+=self.powerChargingRate;
                if(self.airship.power>=100){
                    self.airship.power=100;
                }
            },1000);
        },
        stopCharge:function(){
             
            if(this.chargeTimer){
                clearInterval(this.chargeTimer);
                this.chargeTimer=null;
            }
        },
        getName:function(key){
            return powerModals[key].name;
        }
    };
    return powerSystem;
})();