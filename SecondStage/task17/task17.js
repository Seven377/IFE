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
  var width = 0;
  if(pageState.nowGraTime === "day"){
    width = 5;
  }else if(pageState.nowGraTime === "week"){
    width = 10;
  }else if(pageState.nowGraTime === "month"){
    width = 20;
  }
  var oChart = document.querySelector(".aqi-chart-wrap");
  oChart.innerHTML="";
  // var color ="black";
  for (var i in chartData){
    var data = chartData[i];
    // if(data > 200){
    //   color = "red";
    // }else if(data >100){
    //   color = "green";
    // }else {
    //   color = "blue";
    // }
    var color = '#'+(Math.random()*0xffffff<<0).toString(16);
    oChart.innerHTML += "<div title='" + i + " " + data + "' " + "style='width:"+ width + "px; height:" + data+"px; background-color:" + color + ";'></div>";
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
 var timeChange=false;
function graTimeChange() {
  // 确定是否选项发生了变化 
  // var timeChange=false;

  var oRadio = document.getElementsByName('gra-time');
  for (var i = 0; i < oRadio.length; i ++){
    if(oRadio[i].checked === true){
      if (oRadio[i].value !== pageState.nowGraTime){
        pageState.nowGraTime = oRadio[i].value;
        timeChange = true;
        break;
      }    
    }
  }

  if(timeChange || cityChange){
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }
  
}

/**
 * select发生变化时的处理函数
 */
 var cityChange = false;
function citySelectChange() {
  // 确定是否选项发生了变化 
  var citySelect = document.getElementById('city-select');
  // var cityChange = false;
  if (citySelect.value !== pageState.nowSelectCity){
    cityChange = true;
    pageState.nowSelectCity = citySelect.value;
  }

  if(timeChange || cityChange){
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }
  
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var oField = document.getElementById('form-gra-time');
  oField.onclick = graTimeChange; 
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById('city-select');
  for (var i in aqiSourceData){
    citySelect.innerHTML += "<option>"+ i +"</option>";
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = {};
  var nowTime = pageState.nowGraTime;
  var nowCity = pageState.nowSelectCity;
  var nowCityData = aqiSourceData[nowCity]; 
  if(nowTime === "day"){
    for (var i in nowCityData){
      chartData[i] = nowCityData[i];
    }
  }else if(nowTime === "week"){
    var count = 1;
    var dataSum = 0;
    var currentDay = 0;
    for (var i in nowCityData){
      var nowDate = new Date(i);
      var day = nowDate.getDay();
      if(day === 6){
        count++;
        currentDay++;
        var chartDay = "第" + currentDay + "周";
        dataSum += nowCityData[i];
        chartData[chartDay] = dataSum / count;
        dataSum=0;
        count = 0;
      }else{
        count++;
        dataSum += nowCityData[i];
      }
    }
  }else if(nowTime === "month"){
    var count = 1;
    var dataSum = 0;
    var preMonth = 15;
    for (var i in nowCityData){
      var nowDate = new Date(i);
      var month = nowDate.getMonth();
      if (preMonth == 15){
        preMonth = month;
      }
      if (preMonth !== month){
        var chartMonth = (preMonth + 1) + "月";
        chartData[chartMonth] = dataSum / count;
        count = 1;
        preMonth = month;
      }else{
        count++;
        dataSum += nowCityData[i];
      }
    }
    if (count >= 1){
      var chartMonth = (preMonth + 1) + "月";
      chartData[chartMonth] = dataSum / count;
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  initAqiChartData();
  renderChart();
}

window.onload = init;
// init();