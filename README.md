# waterfall
<b>waterFall(parent,childscls,setting,ajaxcallbak);</b>
<h3>参数说明</h3>
<b>parent:</b> //父容器的ID，必须，string<br>
<b>childscls:</b> //图片块的className，必须，string<br>
//相关设置，可选，没有则为以下默认值<br>
  <b>setting:{</b><br>
  <b>maxColumns:</b> 6, //最大列数，number<br>
  <b>minColumns:</b> 4, //最小列数，number<br>
  <b>margin:</b> 10, //图片块间距，number<br>
  <b>parentMargin:</b> 20, //父容器两侧最小间距，number<br>
  <b>dropDegree:</b> "center", //触发加载时的下拉程度，center下拉到最后一个高度的一半时加载，top顶部时加载，bottom底部时加载，string<br>
  <b>loadingId:</b> false, //是否显示加载状态（loading..）,需自行添加html和css并设置为id名，string<br>
  <b>method:</b> null  //获取数据的后台地址，string<br>
<b>}</b><br>
<b>ajaxcallbak:</b> function(data,oparent)  //返回数据成功时的回调函数，第一个参数为返回的json字符串（已转换为js对象），<br>
                                        第二个是父容器的DOM对象（需自行处理数据并添加到父容器中，function<br>
                                        
  注：document.documentElement.scrollTop=0;   //在页面载入时添加，（重置滚动高度
