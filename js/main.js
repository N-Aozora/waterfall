window.onload=function(){
	
	

	calPosition('main',"aa",6,30);
	window.onresize=function(){
		calPosition('main',"aa",6,30);
	}
}

//瀑布流定位
function calPosition(divbox,clsname,m,M){
	var divbox=document.getElementsByClassName(divbox)[0];
	var divs=divbox.getElementsByClassName(clsname);
	var w=document.documentElement.clientWidth||document.body.clientWidth;//取得浏览器宽度
	
	var margin=m;//设置间距大小
	var _margin=M;//设置浏览器两边间距
	var divwidth=divs[0].clientWidth;//取得块的宽度

	var column_max=6;//最大列数
	var column_min=4;//最小列数
	var column=Math.floor((w-2*_margin-divwidth)/(divwidth+2*margin))+1;//计算列数
	column=column>column_max?column_max:(column<column_min?column_min:column);
	
	var divbox_width=(column-1)*(divwidth+2*margin)+divwidth;//计算容器宽度
	divbox.style.width=divbox_width+"px";

	//设置第一行的定位
	for(var i=0;i<column;i++){
		divs[i].style.left=i*(divwidth+2*margin)+0+"px";
		divs[i].style.top='0px';
	}
	
	for(var j=column;j<divs.length;j++){
		var last_top=divs[j-column].style.top.slice(0,-2)*1;//取得同一列上一个的top值
		var last_height=divs[j-column].clientHeight;//取得同一列上一个的高度
		divs[j].style.left=divs[j-column].style.left;
		divs[j].style.top=last_top+last_height+2*margin+"px";
	}
}
