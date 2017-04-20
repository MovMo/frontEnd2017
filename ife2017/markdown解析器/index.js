var regs = [{
    pattern: /^#\s+(.+)$/,
    handler: function(parentNode, regResult) {
        //匹配h1,标签
        var h1 = document.createElement('h1');
        h1.innerHTML = regResult[1];
        parentNode.appendChild(h1);
    }
}, {
    pattern: /^##\s+([.]+)$/,
    handler: function() {}
}, {
    pattern: /^\*\s+([.\n]+)\s{2,}\n$/,
    handler: function() {}
}, {
    pattern: /^`([.\n]+)`$/,
    handler: function() {}
}, {
    pattern: /^>\s+([.\n]+)\n{2,}/,
    handler: function() {}
}, ];
var MarkdownParse = {
    init: function(editDom, showDom) {
        this.editDom = typeof editDom === 'string' ? document.querySelector(editDom) : editDom;
        this.showDom = typeof showDom === 'string' ? document.querySelector(showDom) : showDom;
    },
    addEvent:function(){
        this.editDom.addEventListener('input',function(e){
            var code=e.keyCode||e.charCode;
            if(code===13){
                //输入回车
            }
        });
    },
    parse: function(lineStr) {
        for (var i = 0, len = regs.length; i < len; i++) {
            var regResult = lineStr.match(regs[i].pattern);
            if (regResult) {
                regs[i].handler(this.showDom, regResult);
                break;
            }
        }
    }
};
var parser = Object.create(MarkdownParse);
parser.init('editor','#show');
parser.parse('# abc');
