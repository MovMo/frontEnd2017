/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

//方法一，因为删除按钮是动态添加的元素，为其绑定事件，方法一是在添加元素的时候就进行绑定
//方法二，也可以利用委托。委托可以为动态添加的元素，事后绑定事件
// var aqiData = {},
//     cityInput=document.getElementById('aqi-city-input'),
//     aqiInput=document.getElementById('aqi-value-input'),
//     aqiTable=document.getElementById('aqi-table');

// /**
//  * 从用户输入中获取数据，向aqiData中增加一条数据
//  * 然后渲染aqi-list列表，增加新增的数据
//  */
// function addAqiData() {
//     var  city,aqi;
//     console.log(/^[\u4e00-\u9fa5_a-zA-Z]+$/.test('北京'));
//     if(/^[\u4e00-\u9fa5_a-zA-Z]+$/.test(cityInput.value)&&/\d+/.test(aqiInput.value)){
//         city=cityInput.value;
//         aqi=aqiInput.value;
//         aqiData[city]=aqi;
//         return true;
//     }else{
//         alert('数据格式错误，请重新输入');
//         return false;
//     }   

// }

// /**
//  * 渲染aqi-table表格
//  */
// function renderAqiList() {
//     // var tr=document.createElement('tr'),
//     //     constr;
//     // constr='<td>城市</td><td>空气质量</td><td>操作</td>';
//     // aqiTabel.appendChild(tr);
//     // for(var city in aqiData){
//     //     constr+='<tr><td>'+city+'</td><td>'+aqiData[city]+'</td><td><button>删除</button></td></tr>';
//     // }
//     // aqiTabel.innerHTML=constr;
//     aqiTable.insertRow(0);
//     aqiTable.rows[0].insertCell(0);
//     aqiTable.rows[0].insertCell(1);
//     aqiTable.rows[0].insertCell(2);
//     aqiTable.rows[0].cells[0].innnerHTML='城市';
//     aqiTable.rows[0].cells[1].innnerHTML='空气质量';
//     aqiTable.rows[0].cells[0].innnerHTML='操作';
//     var i=1;
//     for(var city in aqiData){
//         aqiTable.insertRow(i);
//         aqiTable.rows[i].insertCell(0);
//         aqiTable.rows[i].insertCell(1);
//         aqiTable.rows[i].insertCell(2);
//         console.log(city);
//         aqiTable.rows[i].cells[0].innerHTML=city;
//         aqiTable.rows[i].cells[1].innerHTML=aqiData[city];
//         var btn=document.createElement('button');
//         btn.innerHTML='删除';
//         btn.addEventListener('click',delBtnHandle,false);
//         aqiTable.rows[i].cells[2].appendChild(btn);    
//     }
// }

// /**
//  * 点击add-btn时的处理逻辑
//  * 获取用户输入，更新数据，并进行页面呈现的更新
//  */
// function addBtnHandle() {
//   addAqiData();
//   renderAqiList();
// }

// /**
//  * 点击各个删除按钮的时候的处理逻辑
//  * 获取哪个城市数据被删，删除数据，更新表格显示
//  */
// function delBtnHandle(e) {
//   // do sth.
//   //console.log(e.target);
//   var city=e.target.parentNode.previousSibling.previousSibling.innerHTML;
 
//   aqiTable.removeChild(e.target.parentNode.parentNode.parentNode);
//   delete aqiData[city];
//   renderAqiList();
// }

// function init() {

//   // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
//   var addBtn=document.getElementById('add-btn');

//   addBtn.addEventListener('click',addBtnHandle,false);
//   // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
//   var delBtns=aqiTable.getElementsByTagName('button');
//   for(var i=0,len=delBtns.length;i<len;i++){
//     delBtns[i].addEventListener('click',delBtnHandle,false);
//   }
// }

// init();


/**方法二：使用委托为动态添加的元素绑定事件，并使用自定义数据为button绑定city的取值**/
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {},
    cityInput=document.getElementById('aqi-city-input'),
    aqiInput=document.getElementById('aqi-value-input'),
    aqiTable=document.getElementById('aqi-table');


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=cityInput.value.trim(),
        aqi=aqiInput.value.trim();
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!aqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[city] = aqi;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var constr='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>',
        city;
    for(var city in aqiData){
        constr+='<tr><td>'+city+'</td><td>'+aqiData[city]+'</td><td><button data-city='+city+'>删除</button></td></tr>';
    }
    aqiTable.innerHTML=constr;

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
 
  if(e.target.nodeName.toLowerCase() ==='button'){
    delete aqiData[e.target.dataset.city];
  }

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn=document.getElementById('add-btn');
  addBtn.addEventListener('click',addBtnHandle,false);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  aqiTable.addEventListener('click',delBtnHandle,false);
}

init();