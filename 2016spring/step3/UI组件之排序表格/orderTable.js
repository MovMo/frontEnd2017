var orderTable = {
    init: function(selector, modal) {
        this.dom = document.querySelector(selector);
        this.modal = modal;
        this.renderHeader(this.modal.title, this.modal.config)
        this.renderBody(this.modal.data);
        this.addEvent();
    },
    renderHeader: function(title, config) {
        var thead = document.createElement('thead'),
            constr = '<tr>';
        for (var i = 0; i < title.length; i++) {
            var toOrder = false;
            for (var j = 0; j < config.length; j++) {
                if (i === config[j]) {
                    toOrder = true;
                    break;
                }
            }
            if (toOrder) {
                constr += '<th index="' + i + '">' + title[i] + '<span class="chevron chevron-top"></span><span class="chevron chevron-down"></span></th>';
            } else {
                constr += '<th index="' + i + '">' + title[i] + '</th>'
            }
        }
        constr += '</tr>'
        thead.innerHTML = constr;
        this.dom.appendChild(thead);
        var tbody = document.createElement('tbody');
        this.dom.appendChild(tbody);
        this.tbody = this.dom.querySelector('tbody');
    },
    renderBody: function(data) {
        this.tbody.innerHTML = '';
        var constr = '';
        for (i = 0; i < data.length; i++) {
            var curData = data[i];
            constr += '<tr>'
            for (var j = 0; j < curData.length; j++) {
                constr += '<td>' + curData[j] + '</td>'
            }
            constr += '</tr>';
        }

        this.tbody.innerHTML = constr;


    },
    addEvent: function() {
        var self = this;
        this.dom.querySelector('thead').addEventListener('click', function(e) {
            var target = e.target,
                data = self.modal.data,
                index, orderedData;
            if (hasClass(target, 'chevron-top')) {
                index = +target.parentNode.getAttribute('index');

                orderedData = data.sort(function(pre, post) {

                    return pre[index] - post[index];
                });
                self.renderBody(orderedData);
            } else if (hasClass(target, 'chevron-down')) {
                index = +target.parentNode.getAttribute('index');
                orderedData = data.sort(function(pre, post) {

                    return post[index] - pre[index];
                });
                self.renderBody(orderedData);
            }

        }, false);
    },



};