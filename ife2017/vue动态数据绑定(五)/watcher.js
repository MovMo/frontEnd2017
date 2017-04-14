var Watcher == (function() {
    var Watcher = {
        init: function(props, $vm, cb) {
            this.value = this.getVMval();
            this.$cb = cb;
        },
        update: function() {
            var oldVal = this.valule,
                newVal = this.getVMval();
            if (typeof this.$cb === 'function') {
                this.$cb.call(this.$vm, newVal, oldVal);
            }

        },
        getVMval: function() {
            var propArr = this.props.split('.'),
                result = this.$vm.data[propArr[0]];
            for (var i = 1, len = propArr.length; i < len; i++) {
                result = result[i];
            }
            return result;
        },
        setVMval: function(value) {
            var propArr = this.props.split('.'),
                tmp = this.$vm.data[propArr[0]];
            for (var i = 1, len = propArr.length; i < len; i++) {
                if (i === len - 1) {
                    tmp[propArr[i]] = value;
                } else {

                    tmp = tmp[propArr[i]];
                }
            }
        }
    }
    return Watcher;
})();
