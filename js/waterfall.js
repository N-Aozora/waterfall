//瀑布流定位,参数说明：父容器id，图片块className，相关设置
function waterFall(parent,childscls,setting,ajaxcallbak){
	var oparent=document.getElementById(parent);
	var columns;			//当前列数
	var maxColumns=6;		//最大列数
	var minColumns=4;		//最小列数
	var margin=10;			//数据块之间的间距
	var parentMargin=20;	//父元素的最小左右间距
	var dropDegree="center";//加载新数据的下拉程度
	var method=null;		//后台地址
	var ajaxPOST=null;		//ajax POST方法传递给后台的内容

	var wArr=[];			//储存第一行的left值
	var hArr=[];			//储存当前行的距离父元素顶部的高度
	var H=document.documentElement.clientHeight||document.body.clientHeight;		//当前窗口的高度
	var W=document.documentElement.clientWidth||document.body.clientWidth;			//获取窗口的宽度
	var parentOffsetTop=getOffsetTop(oparent);	//获取父容器对页面顶部的距离
	var isRepeatScrol=true;						//阻止重复下拉的加载事件
	var showload=false;							//是否显示loading

	//根据传入参数更新默认设置
	if(setting){
		if(typeof setting.maxColumns=="number" && setting.maxColumns >0){
			maxColumns=setting.maxColumns;
		}
		if(typeof setting.minColumns=="number" && setting.minColumns >0){
			minColumns=setting.minColumns;
		}
		if(typeof setting.margin=="number" && setting.margin >=0){
			margin=setting.margin;
		}
		if(typeof setting.parentMargin=="number" && setting.parentMargin >=0){
			parentMargin=setting.parentMargin;
		}
		if(typeof setting.dropDegree=="string"){
			dropDegree=setting.dropDegree;
		}
		if(typeof setting.loadingId=="string"){
			showload=document.getElementById(setting.loadingId);
		}
		if(typeof setting.method=="string"){
			method=setting.method;
		}
		if(setting.ajaxPOST){
			ajaxPOST=(typeof setting.ajaxPOST=="object")?JSON.stringify(setting.ajaxPOST):setting.ajaxPOST;
		}
		if(maxColumns<minColumns){
			var _v=maxColumns;
			maxColumns=minColumns;
			minColumns=_v;
		}
	}

	calposition();

	if(window.addEventListener){
		window.addEventListener('scroll',addposition,false);
		window.addEventListener('resize',calposition,false);
	}else if(window.attachEvent){
		window.attachEvent('onscroll',addposition);
		window.attachEvent('onresize',calposition);
	}

	//页面载入时的定位计算
	function calposition(){
		var childs=getbycls(oparent,childscls);
		var w=childs[0].offsetWidth;											//获取数据块的宽度
		W=document.documentElement.clientWidth||document.body.clientWidth;		//获取窗口的宽度
		H=document.documentElement.clientHeight||document.body.clientHeight;	//更新当前窗口的高度
		wArr=[];	//当页面尺寸改变重新定位时清空储存的值
		hArr=[];	//当页面尺寸改变重新定位时清空储存的值

		columns=Math.floor((W-2*parentMargin-w)/(w+margin))+1;								//计算出当前的列数
		columns=(columns<minColumns)?minColumns:(columns>maxColumns)?maxColumns:columns;	//限制列数不能超过最大值或者最小值
		
		//计算所有图片块的定位
		!function calculation(){
			for(var i=0;i<childs.length;i++){
				//设置第一行的left值，并保存在wArr中，将对应列的高度保存在hArr中
				if(i<columns){
					var left=i*(margin+w);
					var top=0;
					childs[i].style.left=left+"px";
					childs[i].style.top=top+"px";
					wArr.push(left);
					hArr.push(top+margin+childs[i].offsetHeight);
				}else{
					var minTop=Math.min.apply(null,hArr);			//取出最小的列高度
					var index=minIndex(minTop);						//匹配最小列高度所在列数
					childs[i].style.left=wArr[index]+"px";			//根据所在列对齐第一行
					childs[i].style.top=hArr[index]+"px"; 			//当前图片块紧接着上一行的最小列高度之后
					hArr[index]+=childs[i].offsetHeight+margin;		//更新当前列的列高度
				}
			}
			if(Math.max.apply(null,hArr)+parentOffsetTop-margin<=H||childs.length<=minColumns){
				childs=getbycls(oparent,childscls);
				hArr=[];
				wArr=[];
				var xmlhttp=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
				xmlhttp.open("POST",method,true);
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
						ajaxcallbak(JSON.parse(xmlhttp.responseText),oparent);	//根据回掉函数处理ajax返回的数据
						calculation();
					}
				}
				xmlhttp.send(ajaxPOST);
			}
			oparent.style.width=columns*(w+margin)-margin+"px";		//设置父容器的宽度
			oparent.style.height=Math.max.apply(null,hArr)+"px";	//设置父容器的高度
			showload.style.width=oparent.style.width;
		}();
	}

	//下拉加载图片
	function addposition(){
		if(!isRepeatScrol||!method) return;
		var childs=getbycls(oparent,childscls);
		var topHeight=document.documentElement.scrollTop||document.body.scrollTop;	//滚动高度
		var lastHeight=Math.max.apply(null,hArr)-margin;	//最后一个图片块的列高度
		//根据设置决定加载的下拉程度，默认到达最后一个高度的一半加载，还可在顶部或底部加载
		if(dropDegree=="top"){
			lastHeight-=childs[childs.length-1].offsetHeight;
		}else if(dropDegree=="bottom"){
			lastHeight=lastHeight;
		}else{
			lastHeight-=childs[childs.length-1].offsetHeight/2;
		}							

      	//当滚动高度加上当前窗口高度大于最后一个图片块的top值时才加载新的数据
		if(H+topHeight-lastHeight-parentOffsetTop>=0){
			isRepeatScrol=false;
			showload.style.display="block";
			var time1=new Date();
			var xmlhttp=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");
			xmlhttp.open("POST",method,true);
			xmlhttp.onreadystatechange=function(){
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
					var _length=childs.length;								//保存加载前的图片块的数量
					ajaxcallbak(JSON.parse(xmlhttp.responseText),oparent);	//根据回掉函数处理ajax返回的数据
					var _newchilds=getbycls(oparent,childscls);				//取得加载后的所有图片块
					var all=[];												//保存每次下拉加载从服务器获得的所有图片块
					var n=_newchilds.length-_length;						//新加载的图片块数量
					//筛选出新加载的图片块
					for(var i=_newchilds.length-n;i<_newchilds.length;i++){
							all.push(_newchilds[i]);
					}
					newposition(all);
					var time2=new Date();
					console.log(time2-time1)
					showload.style.display="none";
					isRepeatScrol=true;
				}
			}
			xmlhttp.send(ajaxPOST);
		}	
	}

	//下拉加载新数据时的定位操作
	function newposition(newall){
		for(var i=0;i<newall.length;i++){
			var minTop=Math.min.apply(null,hArr);			//取出最小的列高度
			var index=minIndex(minTop);						//匹配最小列高度所在列数
			newall[i].style.left=wArr[index]+"px";			//根据所在列对齐第一行
			newall[i].style.top=hArr[index]+"px"; 			//当前图片块紧接着上一行的最小列高度之后
			hArr[index]+=newall[i].offsetHeight+margin;		//更新当前列的列高度
		}
		oparent.style.height=Math.max.apply(null,hArr)+"px";	//更新父容器的高度
	}

	//获取最小列高度的相应列数
	function minIndex(value){
		for(var i=0;i<hArr.length;i++){
			if(value==hArr[i]) return i;
		}
	}

	//根据父元素和类名取得所有的数据块
	function getbycls(oparent,childcls){
		try{
			return oparent.getElementsByClassName(childcls);
		}
		catch(err){
			var allElements=oparent.getElementsByTagName("*");
			var childsElements=[];
			for(var i=0;i<allElements.length;i++){
				if(allElements[i].className==childcls) childsElements.push(allElements[i]);
			}
			return childsElements;
		}
	}

	//获取元素距离页面顶部的距离
	function getOffsetTop(element){
		var _parent=element;
		var top=0;
		do{
			top+=_parent.offsetTop;
			_parent=_parent.offsetParent;
		}
		while(_parent.offsetParent);
		return top;
	}
}
