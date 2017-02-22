var Qipan={
    init:function(id){
        this.elem=getById(id);                  
    },
    create:function(rows,columns){
        this.rows=rows;
        this.columns=columns;
        var i,j,td,curStr='';
        for(i=0;i<=rows;i++){
            curStr+='<tr>'
            for(j=0;j<=columns;j++){
                if(i===0&&j!==0 ){
                    curStr+='<td class="x-axis">'+(j)+'</td>';
                }else if(j===0&&i!==0){
                    curStr+='<td class="y-axis">'+(i)+'</td>';
                }else if(i===0&&j===0){
                    curStr+='<td></td>';
                }else if(i===rows&&j==columns){
                    curStr+='<td class="qipan-ge x-axis y-axis"></td>';
                }else if(i===rows){
                    curStr+='<td class="qipan-ge x-axis"></td>';
                }else if(j===columns){
                    curStr+='<td class="qipan-ge y-axis"></td>';
                }else{
                    curStr+='<td class="qipan-ge"></td>'
                }
            }
            curStr+='</tr>'
        }
        this.elem.innerHTML=curStr;
        this.cells=this.elem.getElementsByTagName('td');
        //addClass(this.elem,'type'+rows);
        this.elem.className='qipan type'+rows;
        //每一格的边长
        this.offset=this.cells[0].clientWidth;
        console.log(this.offset);
    },
    //新建修墙的指令
    build:function(curRow,curColumn){
        if(!this.isQige(curRow,curColumn)){
            console.log('所选的修墙区域超过了棋盘范围！');
            return;
        }
        if(this.isWall(curRow,curColumn)){
            console.log('所选的修墙区域已经有墙!');
            return;
        }
        var cell=this.getCell(curRow,curColumn);
        addClass(cell,'wall');
        
    },  
    //粉刷墙的指令
    bruColor:function(curRow,curColumn,color){
        if(!this.isQige(curRow,curColumn)){
            console.log('所选的刷墙区域超出了棋盘范围！');
            return;
        }
        if(!this.isWall(curRow,curColumn)){
            console.log('所选的刷墙区域没有墙!');
            return;
        }
        var cell=this.getCell(curRow,curColumn);
        cell.style.backgroundColor=color;    
    },
    //随机修墙
    randomBuild:function(){
        var row=Math.round(Math.random()*this.rows),
            column=Math.round(Math.random()*this.columns),
            color=Math.round(Math.random()*0xffffff).toString(16);
        this.build(row,column);
        this.bruColor(row,column,'#'+color);
    },
    getCell:function(curRow,curColumn){
        return this.cells[curRow*(this.columns+1)+curColumn];
    },
    //当前位置是否可以修墙
    isWall:function(curRow,curColumn){
        return hasClass(this.getCell(curRow,curColumn),'wall');
    },
    isQige:function(curRow,curColumn){
        return (curRow>=1&&curRow<=this.rows)&&(curColumn>=1&&curColumn<=this.columns); 
    },
    isAvailable:function(curRow,curColumn){
        return !this.isWall(curRow,curColumn)&&this.isQige(curRow,curColumn);
    }

};