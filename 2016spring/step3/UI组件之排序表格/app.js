var data = {
    title: ['姓名', '语文', '数学',
        '英语', '总分'
    ],
    data: [
        ['小红', 90, 60, 85, 235],
        ['小明', 80, 90, 70, 240],
        ['小亮', 60, 100, 55, 230]
    ],
    config: [1, 3], //配置对哪些列进行排序,列号默认从0开始索引    
};

var myTable = Object.create(orderTable);
myTable.init('#orderTable', data);