/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
//元素查找
var citySelect=document.getElementById('city-select'),
    graTime=document.getElementsByName('gra-time'),
    radioGroup=document.getElementById('radio-group'),
    chartWrap=document.getElementById('chart-wrap');
 

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  //图形绘制
  var allWidth,singleWidth,constr='',curColor,index=0;
  allWidth=parseInt(window.getComputedStyle(chartWrap,false).width,10);
  singleWidth=Math.floor(allWidth/Object.keys(chartData).length);
  for(var item in chartData){
    curColor=Math.floor(Math.random()*0xFFFFF);
    console.log('width:'+singleWidth+'px;height:'+chartData[item]+'px;background:#'+curColor+';left='+index*singleWidth+'px');
    constr+='<div style="width:'+singleWidth+'px;height:'+chartData[item]+'px;background:#'+curColor+';left:'+index*singleWidth+'px"></div>'
    index++;
  }
  chartWrap.innerHTML=constr;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  //获取单选按钮组的值
  var len=graTime.length,timeCheck;
  while(len--){
 
    if(graTime[len].checked){
      timeCheck=graTime[len].value;
      break;
    }
    
  }
  // 确定是否选项发生了变化
  
  if(pageState.nowGraTime===timeCheck){
    return;
  }
  pageState.nowGraTime=timeCheck;
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity===this.value){
    return;
  }
  pageState.nowSelectCity=this.value;
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  //采用事件委托
  radioGroup.addEventListener('click',function(e){
    if(e.target.getAttribute('type')==='radio'){
      graTimeChange.call(graTime,e);
    }
  },false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  citySelect.innerHTML='';
  var constr='',i=0;
  citySelect.innerHTML='';
  for(var city in aqiSourceData){
    constr+='<option value='+city+'>'+city+'</option>';
    i++;
  }
  citySelect.innerHTML=constr;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener('change',function(e){
    citySelectChange.call(this,e);
  },false);

}

 
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
/*
  var pageState = {
    nowSelectCity: 0,
    nowGraTime: "day"
  }
 */
 var date=new Date(),
    cityData={},
    week=1,
    sum=0,
    dayNum=0,
    month=1,
    reg=/(\d{4})\-(\d{2})-(\d{2})/,
    tmp,
    next;
 chartData={};
 cityData=aqiSourceData[pageState.nowSelectCity];
 switch(pageState.nowGraTime){
  case 'day':
    for(var item in cityData){
      chartData[item]=cityData[item];
    }
  break;
  case 'week':
    for(var item in cityData){
      tmp=item.match(reg);
      date.setFullYear(tmp[1]);
      date.setMonth((+tmp[2])-1);
      date.setDate(+tmp[3]);  
      if(date.getDay()===0){
        chartData[week++]=Math.floor(sum/dayNum);
        sum=cityData[item];
        dayNum=1;
      }else{
        sum+=+cityData[item];
        dayNum++;        
      }
      if(dayNum!=0){
        chartData[week]=sum/dayNum;
      }      
    }
  break;
  case 'month':
    cityData['2016-04-01']=0;
    for(var item in cityData){
      tmp=item.match(reg);
      date.setFullYear(tmp[1]);
      date.setMonth((+tmp[2])-1);
      date.setDate(+tmp[3]);
      //每月的第一天
      if(date.getDate()===1&&date.getMonth()!==0){
        chartData[month++]=Math.floor(sum/dayNum);
        sum=cityData[item];
        dayNum=1;
      }else{
        sum+=cityData[item];
        dayNum++;
      }
    }
    delete cityData[2016-04-01];
  break;
 }
 console.log('chartDate:',chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  citySelect.dispatchEvent('change');
}

init();