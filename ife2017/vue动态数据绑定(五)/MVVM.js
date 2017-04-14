var Vue = (function() {
    //完成dom渲染
    var Renders = {
        textRender: {
            update: function(el, value) {
                if (!el.template) {
                    el.template = el.data;
                }
                el.data = el.template.replace(/\{\{([\w\.]+)\}\}/, value);

            }
        }
    };

    var Vue = {
        init: function(option) {
            this.$el = typeof option.el === 'string' ? document.querySelector(option.el) : el;
            this.data = option.data;
            this.$observer = Object.create(Observer);
            this.$observer.setup(this.data);
            this.compile(this.$el);
            // console.log('mvvm:_cbs', this.$observer._cbs);
        },
        //解析相关指令
        compile: function(el) {
            var children = el.childNodes;
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                //如果是文本节点
                if (child.nodeType && child.nodeType === 3) {
                    this.compileTextNode(child);
                }
                if (child.childNodes && child.childNodes.length) {
                    this.compile(child);
                }
            }
        },
        compileTextNode(el) {
            var regResult = el.data.match(/\{\{([\w\.]+)\}\}/),
                props, value;
            if (!regResult) {
                return;
            }
            props = regResult[1];
            value = this.getVMval(props);
            Renders.textRender.update(el, value);
            //增加对该属性的监听，对props路径上的每一个属性都要添加监听
            var propsArr = props.split('.');
            this.$observer.$watch(propsArr[propsArr.length - 1], function(oldValue, newValue) {
                Renders.textRender.update(el, newValue);
            });
        },
        getVMval: function(props) {
            var propArr = props.split('.'),
                result;
            for (var i = 0, len = propArr.length; i < len; i++) {
                if (i === 0) {
                    result = this.data[propArr[i]];
                } else {
                    result = result[propArr[i]];
                }

            }
            return result;
        },
        //根据指令，执行对应的渲染操作

    };
    return Vue;
})();
