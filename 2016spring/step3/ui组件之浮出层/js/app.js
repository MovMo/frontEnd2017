var myModal=Object.create(Modal);
myModal.init('#myModal');
getById('btn').addEventListener('click', function(e) {
    myModal.show('.modal-header');
}, false);