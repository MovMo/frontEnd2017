var Qizi=(function(){
    var degMap={0:{0:0,90:-90,180:180,270:90},
        90:{0:90,90:0,180:-90,270:180},
        180:{0:180,90:90,180:0,270:-90},
        270:{0:-90,90:180,180:90,270:0}
    };
    var directionMap= {top:[-1,0],right:[0,1],bac:[0,1],left:[-1,0]};

    var Qizi={
        init:function(id){
            this.elem=getById(id);
            this.deg=0;//记录this.elem当前的旋转角度，可选值有[0,90,180,270];
            this.row=1;
            this.column=1;
        },     
        //旋转deg度
        //deg可选值为[90，-90,180]
        tur:function(deg){
            this.deg+=deg;
            this.deg=this.deg%360;
            if(this.deg<0){
                this.deg+=360;
            }
            this.elem.style.transform='rotate('+this.deg+'deg)';
        },
        //旋转至deg度
        turTo:function(deg){
            //[目标角度值：{当前角度值：要旋转的角度值}]

            if(this.deg!=deg){
                this.tur(degMap[deg][this.deg]);    
            }        
        },


        //position:目标位置的坐标值
        //turn：是否需要转向
        goTo:function(targetRow,targetColumn,turn,offset){
            //先水平移动，再垂直移动，不能斜着移动
            var offsetRow=targetRow-this.row;
            this.goBy(offsetRow,0,turn,offset);
            var offsetColumn=targetColumn-this.column;
            this.goBy(0,offsetColumn,turn,offset);         
        },
        //offsetPosition:要移动的坐标距离
        //turn：是否需要转向
        //单个棋格的边长
        //事实上水平和竖直移动，一次只能进行一个方向
        goBy:function(offsetRow,offsetColumn,turn,offset){
            if(turn){
                //TOdo:如果同时需要水平移动和垂直移动呢？
                if(offsetRow<0){
                    this.turTo(270);
                }else if(offsetRow[0]>0){
                    this.turTo(90);
                }
                this.row+=offsetRow;
                this.elem.style.top=this.row*offset+'px';
                if(offsetColumn[1]>0){
                    this.turTo(180);
                }else if(offsetColumn[1]<0){
                    this.turTo(0);
                }
            }            
            this.column+=offsetColumn;            
            this.elem.style.left=this.column*offset+'px';
        },
        //对应方向平移异步，无需旋转
        //dire
        tra:function(direction,offset){
            var offsets=directionMap[direction];
            this.goBy(offsets[0],offsets[1],false,offset);
        },
        mov:function(direction,offset){
            var offsets=directionMap[direction];
            this.goBy(offsets[0],offsets[1],true,offset);
        },
        //根据旗子当前的方向，获取下一个坐标值
        getNextCood:function(direction){    

        }
    };
    return Qizi;
})();
