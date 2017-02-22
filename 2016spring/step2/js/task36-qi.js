
var Qi=(function(){
    var commands=[
        {
            pattern:/^(go)(\s+)?(\d+)?$/,
            handler:function(step){
                 
            }
        },
        {},
        {},
        {}
    ];
    var directionMap={'top':0,'lef':270,'rig':90,'bac':180};     
    var Qi={
        init:function(){
            var qipan=Object.create(Qipan);
            qipan.init('qipan');
            qipan.create(20,20);
            var qizi=Object.create(Qizi);
            qizi.init('qizi');
            this.qipan=qipan;
            this.qizi=qizi;
        },
        setResolution:function(size){
            this.qipan.create(size,size);
            this.qizi.elem.className='qizi type'+size;
        },
        //旋转
        tun:function(direction){
            this.qizi.tun(directionMap[direction]);
        },
        //修墙
        //在curRow,curColumn对应的位置修墙
        //如果没有参数，则在棋盘对应位置的前方修墙
        build:function(curRow,curColumn){
            var nextCood=this.qizi.getNextCood(),
                row=curRow||nextCood[0],
                column=curColumn||nextCood[1];
            // if(!this.isAvailable(row,column)){
            //     console.log('当前位置不可修墙');
            //     return;
            // }
            this.qipan.build(row,column);
        },
        bruColor:function(curRow,curColumn,color){
            if(typeof curRow!=='number'){
                var nextCood=this.qizi.getNextCood();
                color=curRow;
                curRow=nextCood[0];
                curColumn=nextCood[1];
            }           
                 
            this.qipan.bruColor(curRow,curColumn,color);
        },
        //向着指定的方向移动，如果需要的话，在移动之前旋转
        mov:function(direction){
             
            if(!this.checkPath(direction)){
                console.log('此方向路不通！');
                return;
            }

            this.qizi.mov(directionMap[direction],this.qipan.offset);
        },
        //向着指定的方向平移，并且不旋转
        tra:function(direction){
            if(!this.checkPath(direction)){
                console.log('此方向路不通！');
                return;
            }
            this.qizi.tra(directionMap[direction],this.qipan.offset);
        },
        randomBuild:function(){
            this.qipan.randomBuild();
        },
        checkPath:function(direction){
            //检查下一步是否可行
            var nextCood=this.qizi.getNextCood(directionMap[direction]);
            if(this.qipan.isAvailable(nextCood[0],nextCood[1])){
                return true;
            }
            return false;
        }     

    };  
    return Qi;  
})();
