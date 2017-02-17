
var Qi=(function(){
    var commands=[
        {
            pattern:/^(go)(\s+)?(\d+)?$/,
            handler:function(step){
                return this.run(this.go,);
            }
        },
        {},
        {},
        {}
    ];
    var directionMap={'top':0,'lef':'-90','rig':90,'bac':180};
    var degMap={0:[0,-1],90:[1,0],180:[0,1],270:[-1,0]};
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
        tur:function(direction){
            this.qizi.tur(direction[direction]);
        }
        //修墙
        //在curRow,curColumn对应的位置修墙
        //如果没有参数，则在棋盘对应位置的前方修墙
        build:function(curRow,curColumn){
            var row=curRow||this.qizi.row[degMap[this.qizi.deg][0]];
        }
         

    };  
    return Qi;  
        }
})();
