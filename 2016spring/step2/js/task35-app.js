var piece=Object.create(Piece);
piece.init('piece',5,5);
piece.turnLeft();
setTimeout(function(){
    piece.go();
},500);