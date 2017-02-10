 
/*
 * @Author: weibo Li
 * @Date:   2017-02-09
 */

var Airship=(function(){
    var PLANET_RADIUS=105,
        AIRSHIP_WIDTH=50,
        ORBIT_SPACE=40;

    var Airship={
        init:function(id){
            ConsoleUtil.log('airship'+id+':init');
            this.state='init';
            this.shipDom=getById('airship_'+id);
            this.showDom=getById('show_'+id);
            this.commandPanel=getById('commandPanel_'+id);
            this.id=+id;
            //this.power=100;
            //信息系统
            this.msgSystem=Object.create(MsgSystem);
            this.msgSystem.init(this);
        },
        create:function(dynamicModal,powerModal){
            //只有在初始化或者销毁之后再次利用的条件下才能创建
            
            if(this.state!=='init'&&this.state!=='destroy'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':create');
                        //位置复原
            this.power=100;
            
            //this.shipDom.style.marginLeft=-(PLANET_RADIUS+this.id*ORBIT_SPACE)+'px';
            //this.shipDom.style.marginTop=-(AIRSHIP_WIDTH/2)+'px';           
            //呈现
            this.shipDom.style.display='block';
            this.showDom.style.display='table-row';
            this.commandPanel.style.display='block';
            //动力系统，负责飞行、停止以及飞行中的耗能
            this.dynamicSystem=Object.create(DynamicSystem);
            this.dynamicSystem.init(this,dynamicModal);
            this.dynamicSystem.deg=0;
            this.shipDom.style.transform='rotate(0deg)';
            this.powerSystem=Object.create(PowerSystem);
            this.powerSystem.init(this,powerModal);
            //开始充电
            this.powerSystem.charge();
            this.showDom.cells[1].innerHTML=this.dynamicSystem.getName(dynamicModal);
            this.showDom.cells[2].innerHTML=this.powerSystem.getName(powerModal);
            this.showDom.cells[0].innerHTML=this.id+'号';
            this.showDom.cells[3].innerHTML='stop';
            this.showDom.cells[4].innerHTML='100%';
            //向bus注册
            Bus.registerShip(this);
            //开始周期性的广播状态信息
            this.msgSystem.periodicSend();
            this.state='stop';

        },
        fly:function(){
            //只有停止的状态下才能飞行
            if(this.state!=='stop'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':fly');
            this.state='fly';
            this.dynamicSystem.move();
            this.dynamicSystem.discharge();

        },
        stop:function(){
            //只有在飞行或者初始化的条件下，才能停下
            if(this.state==='stop'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':stop');            
            this.dynamicSystem.stopMove();
            this.dynamicSystem.stopDischarge();
            this.state='stop';
        },
        destroy:function(){
            //除了在已经销毁的条件下，其他任何情况都可以销毁
            if(this.state==='destroy'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':destroy');
            
            this.powerSystem.stopCharge();
            //停止飞行动作计时器和耗电计时器
            this.stop();            
            this.showDom.style.display='none';
            this.commandPanel.style.display='none';
            this.shipDom.style.display='none';
            //结束周期性广播
            this.msgSystem.stopPeriodicSend();
            //从bus中删除
            Bus.removeShip(this);
            this.state='destroy';           
            
        },

    };   
    return Airship;
})();

 