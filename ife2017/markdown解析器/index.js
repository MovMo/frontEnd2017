var regs = [{
    pattern: /^#\s+(.+)$/,
    handler: function() {}
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
    parse: function(lineStr) {
        for (var i = 0, len = regs.lenght; i < len; i++) {
            var regResult = lineStr.match(regs[i].pattern);
            if (regResult) {
                console.log(regResult[1]);
                break;
            }
        }
    }
};
console.log(MarkdownParse.parse('# abc\n'));
