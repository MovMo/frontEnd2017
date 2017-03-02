let app2 = Object.create(Observer);
app2.setup({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});


app2.$watch('name', function(newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});
// app2.$watch('name', function(newName) {
//     console.log('set', arguments)
// }); 