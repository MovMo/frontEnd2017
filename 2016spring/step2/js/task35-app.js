var piece=Object.create(Piece);
piece.init('piece',5,5);
var userIn=Object.create(UserIn);
userIn.init(piece);
//console.log(/^turn(?:Left|Right|Bottom)$/.test('turnLeft'));
getById('execute-btn').addEventListener('click',function(e){
    userIn.execute();
},false);
getById('refresh-btn').addEventListener('click',function(e){
    userIn.clear();
},false);