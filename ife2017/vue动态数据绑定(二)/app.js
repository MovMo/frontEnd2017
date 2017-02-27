 let app1 = new Observer({
         name: 'youngwind',
         age: 25,
         child:{
            name:'bobo',
         }
 });

 // 你需要实现 $watch 这个 API
 app1.watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });