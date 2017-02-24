var Qi = (function() {
    //相当于路由



    var tunMap = {
        'top': 0,
        'lef': -90,
        'rig': 90,
        'bac': 180
    };
    var directionMap = {
        'top': 0,
        'lef': 270,
        'rig': 90,
        'bot': 180
    };
    var Qi = {
        commandRoute: [{
            pattern: /^go(?:\s+)?(\d+)$/,
            handler: function(step) {
                return this.run(this.go, [step]);
            }
        }, {
            pattern: /^tun(?:\s+)(lef|rig|bac)$/,
            handler: function(direction) {
                return this.run(this.tun, [direction]);
            }
        }, {
            pattern: /^tra(?:\s+)?(lef|rig|bot|top)(?:\s+)?(\d+)?$/,
            handler: function(direction, step) {
                return this.run(this.tra, [direction, step])
            }
        }, {
            pattern: /^mov(?:\s+)?(lef|rig|bot|top)(?:\s+)?(\d+)?$/,
            handler: function(direction, step) {
                return this.run(this.mov, [direction, step]);
            }
        }, {
            pattern: /^build$/,
            handler: function() {
                return this.run(this.build);
            }
        }],
        init: function() {
            var qipan = Object.create(Qipan);
            qipan.init('qipan');
            qipan.create(20, 20);
            var qizi = Object.create(Qizi);
            qizi.init('qizi');
            this.qipan = qipan;
            this.qizi = qizi;
            //记录动画（行动）的队列
            this.queue = [];
            this.running = false;
            this.duration = 200;
        },
        setResolution: function(size) {
            this.qipan.create(size, size);
            this.qizi.elem.className = 'qizi type' + size;
        },
        setDuration: function(duration) {
            this.duration = duration;
        },
        //旋转
        tun: function(direction) {
            this.qizi.tun(tunMap[direction]);
        },
        //修墙
        //在curRow,curColumn对应的位置修墙
        //如果没有参数，则在棋盘对应位置的前方修墙
        build: function(curRow, curColumn) {
            var nextCood = this.qizi.getNextCood(),
                row = curRow || nextCood[0],
                column = curColumn || nextCood[1];
            // if(!this.isAvailable(row,column)){
            //     console.log('当前位置不可修墙');
            //     return;
            // }
            this.qipan.build(row, column);
        },
        bruColor: function(curRow, curColumn, color) {
            if (typeof curRow !== 'number') {
                var nextCood = this.qizi.getNextCood();
                color = curRow;
                curRow = nextCood[0];
                curColumn = nextCood[1];
            }

            this.qipan.bruColor(curRow, curColumn, color);
        },
        //向着指定的方向移动，如果需要的话，在移动之前旋转
        mov: function(direction, step) {

            if (!this.checkPath(direction)) {
                console.log('此方向路不通！');
                return;
            }

            this.qizi.mov(directionMap[direction], this.qipan.offset, step);
        },
        //向着指定的方向平移，并且不旋转
        tra: function(direction, step) {
            if (!this.checkPath(direction)) {
                console.log('此方向路不通！');
                return;
            }
            this.qizi.tra(directionMap[direction], this.qipan.offset, step);
        },
        //向着头部所指的位置移动一步
        go: function(step) {
            if (!this.checkPath()) {
                console.log('此方向路不通！');
                return;
            }
            this.qizi.tra(this.qizi.deg, this.qipan.offset, step);
        },
        randomBuild: function() {
            this.qipan.randomBuild();
        },
        checkPath: function(direction) {
            //检查下一步是否可行
            var nextCood = this.qizi.getNextCood(directionMap[direction]);
            if (this.qipan.isAvailable(nextCood[0], nextCood[1])) {
                return true;
            }
            return false;
        },
        //run返回一个promise
        //promise中所作的工作是：令当前的指令入队，并启动指令循环（如果running为false的话)
        run: function(func, params) {
            //返回一个promise
            var promise = new Promise((function(resolve, reject) {
                this.queue.push({
                    func: func,
                    params: params,
                    callback: function(e) {
                        if (e) {
                            reject(e);
                        } else {
                            resolve();
                        }
                    }
                });
            }).bind(this));
            if (!this.running) {
                this.taskloop();
            }
            return promise;
        },
        //指令循环，挨个真正的go,tra,mov等指令
        taskloop: function() {
            this.running = true;
            var curTask = this.queue.shift();
            if (curTask) {
                try {
                    curTask.func.apply(this, curTask.params);
                    curTask.callback();
                    setTimeout(this.taskloop.bind(this), this.duration);
                } catch (e) {
                    this.running = false;
                    this.queue = [];
                    curTask.callback(e);
                }
            } else {
                this.running = false;
            }
        },
        //命令解析
        parse: function(commandStr) {
            var i, len;
            for (i = 0, len =this.commandRoute.length; i < len; i++) {
                var command = this.commandRoute[i],
                    match = commandStr.match(command.pattern);

                if (match) {
                    match.shift();
                    return {
                        handler: command.handler,
                        params: match
                    };
                }
            }
            return false;
        },
        exec: function(commandStr) {
            var command = this.parse(commandStr);
            if (command) {
                //这句话并不执行真正的下棋指令
                //而是返回下棋指令对应的promise
                //并且在定义promise的时候，令真正的下棋指令入指队列，并启动队列才做
                return command.handler.apply(this,command.params);
            } else {
                return false;
            }
        }
    };
    return Qi;
})();