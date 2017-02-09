 
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
            this.power=100;
            //信息系统
            this.msgSystem=Object.create(MsgSystem);
            this.msgSystem.init(this);
        },
        create:function(dynamicModal,powerModal){
            //只有在初始化的条件下才能创建
            
            if(this.state!=='init'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':create');
            this.state='create';
            //位置复原
            this.shipDom.style.marginLeft=-(PLANET_RADIUS+this.id*ORBIT_SPACE)+'px';
            this.shipDom.style.marginTop=-(AIRSHIP_WIDTH/2)+'px';
            //呈现
            this.shipDom.style.display='block';
            this.showDom.style.display='block';
            this.commandPanel.style.display='block';
            //开始充电
            this.powerSystem.charge();
                        //动力系统，负责飞行、停止以及飞行中的耗能
            this.dynamicSystem=Object.create(DynamicSystem);
            this.dynamicSystem.init(this,dynamicModal);
            this.powerSystem=Object.create(PowerSystem);
            this.powerSystem.init(this,powerModal);
            //向bus注册
            Bus.registerShip(this);
        },
        fly:function(){
            //只有在初始化，或者停止的状态下才能飞行
            if(this.state!=='create'&&!this.state!=='stop'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':fly');
            this.state='fly';
            this.dynamicSystem.move();
            this.dynamicSystem.discharge();

        },
        stop:function(){
            //只有在飞行的条件下，才能停下
            if(this.state!=='fly'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':stop');
            this.state='stop';
            this.dynamicSystem.stopMove();
            this.dynamicSystem.stopDischarge();
        },
        destroy:function(){
            //除了在已经销毁的条件下，其他任何情况都可以销毁
            if(this.state==='destroy'){
                return;
            }
            ConsoleUtil.log('airship'+this.id+':destroy');
            this.state='destroy';
            this.powerSystem.stopCharge();
            this.shipDom.style.display='none';
            this.commandPanel.style.display='none';
            //从bus中删除
            Bus.removeShip(this);
            //将这个对象置为空
            
        },

    };   
    return Airship;
})();

 