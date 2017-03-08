var Modal = {
    init: function(selector) {
        this.modal = document.querySelector(selector);
        this.dialog = this.modal.querySelector('.modal-dialog');
        //this.toClientCenter(this.dialog);
        //betweenX,between记录距离dialog左上角的距离
        this.betweenX = 0;
        this.betweenY = 0;
        //记录到dialog定位的left，top的距离（因为定义了translate(-50%,-50%)，所以left，top并非左上角，而是dialog的中心位置）
        this.disX = 0;
        this.disY = 0;
        this.modal.style.display = 'none';
        this.isDraging = false;
        this.addEvent();
    },
    addEvent: function() {
        var self = this;
        this.modal.querySelector('.close').addEventListener('click', this.hide.bind(this), false);
        this.modal.querySelector('#cancel').addEventListener('click', this.hide.bind(this), false);
        var header = this.modal.querySelector('.modal-header');
        //点击弹出框之外的部分的时候，关闭弹出框
        document.body.addEventListener('click', function(e) {
            if (e.target.className === 'modal') {
                self.hide(e);
            }
        }, false);
        //按下esc建的时候，关闭弹出框
        document.body.addEventListener('keyup', function(e) {
            var code = e.keyCode || e.charCode;
            if (code === 27) {
                self.hide(e);
            }
        }, false);

        //处理拖拽
        header.addEventListener('mousedown', this.mousedownHandler.bind(this), false);
        //处理缩放
        document.body.addEventListener('mousemove', throttle(this.mousemoveHandler,this,10), false);
        document.body.addEventListener('mouseup', this.mouseupHandler.bind(this), false);

    },
    mousedownHandler: function(e) {
        //因为设置了translate(-50%,-50%)，因此top，left是基于中心点而非左上角，在这里需要将这个考虑到
        this.disX = e.clientX - parseInt(this.dialog.offsetLeft, 10);
        this.disY = e.clientY - parseInt(this.dialog.offsetTop, 10);
        this.betweenX = this.disX + this.dialog.clientWidth / 2;
        this.betweenY = this.disY + this.dialog.clientHeight / 2;
        this.isDraging = true;
        console.log('mousedown',this.isDraging);

    },
    mousemoveHandler: function(e) {
        console.log('mousemove',this.isDraging);
        if (this.isDraging) {
            console.log('mousemove:', this.isDraging);
            var ex = e.clientX,
                ey = e.clientY,
                dialogWidth = parseInt(this.dialog.clientWidth, 10),
                dialogHeight = parseInt(this.dialog.clientHeight, 10),
                clientWidth = parseInt(document.documentElement.clientWidth, 10),
                clientHeight = parseInt(document.documentElement.clientHeight, 10);
            //控制拖动边界            
            if (ex <= this.betweenX) {
                this.dialog.style.left = dialogWidth / 2 + 'px';
            } else if (ey <= this.betweenY) {
                this.dialog.style.top = dialogHeight / 2 + 'px';
            } else if (ex >= clientWidth - (dialogWidth - this.betweenX)) {
                this.dialog.style.left = (clientWidth - dialogWidth / 2) + 'px';
            } else if (ey >= clientHeight - (dialogHeight - this.betweenY)) {
                this.dialog.style.top = (clientHeight - dialogHeight / 2) + 'px';
            } else {
                this.dialog.style.left = (e.clientX - this.disX) + 'px';
                this.dialog.style.top = (e.clientY - this.disY) + 'px';
            }
        }

    },
    mouseupHandler: function(e) {

        //console.log('mouseup');       
        this.isDraging = false;
        console.log('mouseup', this.isDraging);
    },
    show: function() {
        if (this.isVisable()) {
            return;
        }
        this.modal.style.display = 'block';
        this.isDraging=false;

    },
    hide: function(e) {
        this.isDraging=false;
        if (this.isVisable()) {
            this.modal.style.display = 'none';
        }
        e.stopPropagation();
    },
    isVisable: function() {
        //console.log(getComputedStyle(this.modal,'display'));         
        return this.modal.style.display !== 'none';
    }
};