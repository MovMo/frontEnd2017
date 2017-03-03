var Vue = {
    init: function(data) {
        this.data = data;
        this.elem = document.querySelector(data.el);
        this.children = this.elem.children;
        this.render();
    },
    render: function() {
        var i, len,self=this;
        for (i = 0, len = this.children.length; i < len; i++) {
            this.children[i].innerHTML=this.children[i].innerHTML.replace(Vue.regText, function(match, match1) {
                         
               return self.parse(match1);
            });
        }
    },
    parse:function(pathStr){
        var i,len,curData=this.data.data;
            paths=pathStr.split('.');
        for(i=0,len=paths.length;i<len;i++){
            curData=curData[paths[i]];
        }
        return curData;
    }
};
Vue.regText = /\{\{(.+)\}\}/g;

var vue = Object.create(Vue);
vue.init({
    el: '#app',
    data: {
        user: {
            name: 'youngwind',
            age: 25
        }
    }
});