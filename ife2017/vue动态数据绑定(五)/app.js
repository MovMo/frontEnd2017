var app = Object.create(Vue);

var option = {
    el: '#app',
    data: {
        user: {
            name: 'bobo',
            age: '28'
        },
        scholl: 'bupt',
        major: 'computer'
    }
};
app.init(option);
