var Qizi=(function(){
    var degMap={0:{0:0,90:-90,180:180,270:90},
        90:{0:90,90:0,180:-90,270:180},
        180:{0:180,90:90,180:0,270:-90},
        270:{0:-90,90:180,180:90,270:0}
    };
    var stepMap= {0:[-1,0],90:[0,1],180:[1,0],270:[-1,0]};

    var Qizi={
        init:function(id){
            this.elem=getById(id);
            this.deg=0;//记录this.elem当前的旋转角度，可选值有[0,90,180,270];
            this.row=1;
            this.column=1;
        },     
        //旋转deg度
        //deg可选值为[90，-90,180]
        tun:function(deg){
            this.deg+=deg;
            this.deg=this.deg%360;            
            this.elem.style.transform='rotate('+this.deg+'deg)';
            if(this.deg<0){
                this.deg+=360;
            }
        },
        //旋转至deg度
        tunTo:function(deg){
            //[目标角度值：{当前角度值：要旋转的角度值}]

            if(this.deg!=deg){
                this.tun(degMap[deg][this.deg]);    
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
                    this.tunTo(270);
                }else if(offsetRow[0]>0){
                    this.tunTo(90);
                }

                if(offsetColumn[1]>0){
                    this.tunTo(180);
                }else if(offsetColumn[1]<0){
                    this.tunTo(0);
                }
            }
            if(offsetRow!==0){
                this.row+=offsetRow;
                this.elem.style.top=this.row*offset+'px';                 
            }  
            if(offsetColumn!==0){
                this.column+=offsetColumn;            
                this.elem.style.left=this.column*offset+'px';                
            }

        },
        //对应方向平移异步，无需旋转
        //direction的取值为[0|90|180|-90]
        //offset为棋盘格子的边长
        tra:function(direction,offset){
            var offsets=stepMap[direction];
            this.goBy(offsets[0],offsets[1],false,offset);
        },
        //对应方向平移异步，无需旋转
        //direction的取值为[0|90|180|-90]
        //offset为棋盘格子的边长
        mov:function(direction,offset){
            var offsets=stepMap[direction];
            this.goBy(offsets[0],offsets[1],true,offset);
        },
        //根据旗子当前的方向，获取下一个坐标值
        getNextCood:function(direction){
            var tmpMap=direction?stepMap[direction]:stepMap[this.deg];    
            return [this.row+tmpMap[0],
                    this.column+tmpMap[1]];
        }
    };
    return Qizi;
})();
