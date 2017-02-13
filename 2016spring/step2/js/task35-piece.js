var Piece=(function(){
    var START_LEFT=20,
        START_TOP=20,
        END_LEFT=20+40*10,
        END_TOP=10+40*10,
        TD_WIDTH=40,
        ROW_COUNT=10,
        COLUMN_COUNT=10,
        DEG_STEP=20,
        DIS_STEP=4;

    var Piece={
        init:function(id,row,column){
            this.deg=0;
            this.row=row;
            this.column=column;
            this.dicrection='top';
            this.pieceDom=getById(id);
            this.pieceDom.style.left=(START_LEFT+this.row*TD_WIDTH)+'px';
            this.pieceDom.style.top=(START_TOP+this.column*TD_WIDTH)+'px';
        },
        getDicrection:function(){
            var result='top';
            if(this.deg==0){
                result='top';
            }else if(this.deg===90||this.deg===-270){
                result='right';
            }else if(this.deg===-90||this.deg===270){
                result='left';
            }else if(this.deg===180||this.deg===-180){
                result='bottom';
            }
            return result;
        },
        go:function(direction){
             var curDirection=direction||this.getDicrection(),
                isHorizontal=(curDirection==='left'||curDirection==='right'),
                isPositive=(curDirection==='bottom'||curDirection==='right'),
                initPos,endPos,timer;
            if(isHorizontal){  
                initPos=START_LEFT+this.column*TD_WIDTH;        
                this.column+=isPositive?1:-1;             
                if(this.column<1){
                    this.column=1;
                    return;
                }
                if(this.column>COLUMN_COUNT){
                    this.column=COLUMN_COUNT;
                    return;
                }
                endPos=START_LEFT+this.column*TD_WIDTH;
                //AnimUtil.updatePosition(this.pieceDom,'left',initPos,DIS_STEP,endPos,'px');
                this.pieceDom.style.left=(START_LEFT+this.column*TD_WIDTH)+'px';
                
            }else{
                initPos=START_TOP+this.row*TD_WIDTH;
                this.row+=isPositive?1:-1;
                if(this.row<1){
                    this.row=1;
                    return;
                }
                if(this.row>ROW_COUNT){
                    return;
                }
                endPos=START_TOP+this.row*TD_WIDTH;
                //AnimUtil.updatePosition(this.pieceDom,'top',initPos,DIS_STEP,endPos,'px');       
                this.pieceDom.style.top=(START_TOP+this.row*TD_WIDTH)+'px';      
            }             
        },
        turn:function(deg){
            this.pieceDom.style.transform='rotate('+deg+'deg)';
            //AnimUtil.updatePosition(this.pieceDom,'transform',initDeg,DEG_STEP,this.deg,'deg'); 
            if(this.deg<=-360||this.deg>=360){
                this.deg=0;
            }                 
        },
        turnLeft:function(){   
                          
            this.deg-=90;     
            this.turn(this.deg);
               
        },
        turnRight:function(){             
            this.deg+=90;
            this.turn(this.deg);
        },
        turnBottom:function(){         
            this.deg+=180;
            this.turn(this.deg);             
        },
        moveLeft:function(){
            //先将方向旋转到左边
            while(this.getDicrection()!=='left'){
                this.turnLeft(); 
            }            
            this.go();
        },    
        moveRight:function(){
            while(this.getDicrection()!=='right'){
                this.turnRight();   
            }            
            this.go();
        },
        moveTop:function(){
            while(this.getDicrection()!=='top'){
                this.turnRight();
            }
            this.go();
        },
        moveBottom:function(){
            while(this.getDicrection()!=='bottom'){
                this.turnRight();
            }
            this.go();
        },
        //向左移动，方向不变
        traLeft:function(){
            this.go('left');
        },
        traRight:function(){
            this.go('right');
        },
        traTop:function(){
            this.go('top');
        },
        traBottom:function(){
            this.go('bottom');
        }
    };
    return Piece;
})();

//不使用setInterval，而是使用css3的transion属性来完成动画
// var AnimUtil={
//     updatePosition:function(elem,property,startValue,stepValue,endValue,unit){
//         var curValue=startValue,
//             isPositive=curValue<endValue;
//         var timer=setInterval(function(){
//             curValue+=isPositive?stepValue:-stepValue;
//             if(curValue>=endValue&&isPositive||curValue<=endValue&&!isPositive){
//                 curValue=endValue;
//                 clearInterval(timer);
//             }
//             if(unit!=='deg'){
//                 elem.style[property]=curValue+unit;
//             }else{
//                 elem.style[property]='rotate('+curValue+'deg)';
//             }        
//         },100);
//     },    
// };
