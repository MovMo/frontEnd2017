var Piece=(function(){
    var START_LEFT=20,
        START_TOP=20,
        END_LEFT=20+40*10,
        END_TOP=10+40*10,
        TD_WIDTH=40,
        ROW_COUNT=10,
        COLUMN_COUNT=10;

    var Piece={
        init:function(id,row,column){
            this.deg=0;
            this.row=row;
            this.column=column;
            this.dicrection='top';
            this.pieceDom=getById(id);
            this.pieceDom.style.left=START_LEFT+this.row*TD_WIDTH;
            this.pieceDom.style.top=START_TOP+this.column*TD_WIDTH;
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
        go:function(){
             var curDirection=this.getDicrection(),
                isHorizontal=(curDirection==='left'||curDirection==='right'),
                isPositive=(curDirection==='bottom'||curDirection==='right'),
                curPos,endPos;
            if(isHorizontal){          
                this.column+=isPositive?1:-1;             
                if(this.column<1){
                    this.column=1;
                    return;
                }
                if(this.column>COLUMN_COUNT){
                    this.column=COLUMN_COUNT;
                    return;
                }
                this.pieceDom.style.left=(START_LEFT+this.column*TD_WIDTH)+'px';
                
            }else{
                this.row+=isPositive?1:-1;
                if(this.row<1){
                    this.row=1;
                    return;
                }
                if(this.row>ROW_COUNT){
                    return;
                }           
                this.pieceDom.style.top=(START_TOP+this.row*TD_WIDTH)+'px';
            
            }             
        },
        turn:function(){
            if(this.deg<=-360||this.deg>=360){
                this.deg=0;
            }
            this.pieceDom.style.transform='rotate('+this.deg+'deg)';                 
        },
        turnLeft:function(){  
            console.log(this.deg);                 
            this.deg-=90;
            this.turn();  
            console.log(this.deg);    
        },
        turnRight:function(){
            this.deg+=90;
            this.turn();
        },
        turnBack:function(){
            this.deg+=180;
            this.turn();
        }    

    };
    return Piece;
})();
var commandInput=getById('command_input');
var piece=Object.create(Piece);
piece.init('piece',1,1);
getById('execute-btn').addEventListener('click',function(){
    var command=commandInput.value;
    switch(command){
        case 'go':
        case 'turnLeft':
        case 'turnRight':
        case 'turnBack':
            piece[command].apply(piece,null);
        break;
        default:
        break;
    }

},false);