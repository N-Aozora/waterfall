//瀑布流定位
function waterFall(parent,childs,setting){
	if(window.addEventListener){
		window.addEventListener('scroll',addposition,false);
	}else if(window.attachEvent){
		window.attachEvent('onscroll',addposition);
	}
	window.hArr=[];

	var a=true;
	
	calposition("main","aa",setting);
	function addposition(){
		//接受到的服务器数据
		var data={"data":[{"img":"img_03.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"},{"img":"img_05.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"},{"img":"img_07.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"},{"img":"img_09.jpg","aaleft":"sety_03.png","title":"欧美风格人物",
		"headpic":"afw_03.jpg","person":"v2老黑","release":"时尚范","time":"2012-04-15 17:07:28",
		"like":"10","collection":"30","comment":"50"}]};
	var oparent=document.getElementById("main");
		var childs=getbycls(oparent,"aa");
		console.log(childs)
		var H=document.documentElement.clientHeight||document.body.clientHeight;
		var topHeight=document.documentElement.scrollTop||document.body.scrollTop;
		var lastHeight=parseInt(childs[childs.length-1].style.top);
			console.log(Math.max.apply(null,hArr))

		var moban='<div class="img"><a href=""><img src="images/{{img_src}}" /><div class="hover"></div></a>'+
                       '<div class="aaleft"><img src="images/{{aaleft_img}}" /></div></div>'+
      				'<div class="title"><span>{{title_txt}}</span></div>'+
      				'<div class="dynamic">'+
        				'<div class="headpic"><img src="images/{{headpic}}" /></div>'+
        			'<div class="dynamictext"><p><span class="sc">{{person}}</span><span>发布到</span>'+
        			'<span class="sc">{{release}}</span></p><p class="time">（{{time}}）</p></div></div>'+
     				' <div class="action">'+
        			'<p><span>{{like}} 喜欢</span><span>丨</span><span>{{collection}} 采集</span>'+
        			'<span>丨</span><span>{{comment}} 评论</span></p></div>';

      	var all=[];
		if(H+topHeight-lastHeight>0&&a){
			a=false;
			for(var i=0;i<data.data.length;i++){
				var aa=document.createElement("div");
				aa.className="aa";
				var newdiv=moban.replace(/{{img_src}}/,data.data[i].img)
								.replace(/{{aaleft_img}}/,data.data[i].aaleft)
								.replace(/{{title_txt}}/,data.data[i].title)
								.replace(/{{headpic}}/,data.data[i].headpic)
								.replace(/{{person}}/,data.data[i].person)
								.replace(/{{release}}/,data.data[i].release)
								.replace(/{{time}}/,data.data[i].time)
								.replace(/{{like}}/,data.data[i].like)
								.replace(/{{collection}}/,data.data[i].collection)
								.replace(/{{comment}}/,data.data[i].comment);
				aa.innerHTML=newdiv;
				all.push(aa);
				document.getElementById("main").appendChild(aa);
			}
			calposition("main","aa",setting);
			a=true;
		}
	}

	function calposition(parent,childs,setting){

	var oparent=document.getElementById(parent);
	var childs=getbycls(oparent,childs);

	var columns;	//当前列数
	var maxColumns=6;	//最大列数
	var minColumns=4;	//最小列数
	var margin=10;		//数据块之间的间距
	var parentMargin=20;	//父元素的最小左右间距
	var W=document.documentElement.clientWidth||document.body.clientWidth;	//获取窗口的宽度
	var w=childs[0].offsetWidth;	//获取数据块的宽度
	var wArr=[];	//储存第一行的left值
	 hArr=[];	//储存当前行的top值

	if(setting){
		if(setting.maxColumns){
			maxColumns=setting.maxColumns;
		}
		if(setting.minColumns){
			minColumns=setting.minColumns;
		}
		if(setting.margin){
			margin=setting.margin;
		}
		if(setting.parentMargin){
			parentMargin=setting.parentMargin;
		}
	}

	columns=Math.floor((W-2*parentMargin-w)/(w+margin))+1;
	columns=(columns<minColumns)?minColumns:(columns>maxColumns)?maxColumns:columns;

	oparent.style.width=columns*(w+margin)-margin+"px";

	for(var i=0;i<childs.length;i++){
		if(i<columns){
			var left=i*(margin+w);
			var top=0;
			childs[i].style.left=left+"px";
			childs[i].style.top=top+"px";
			wArr.push(left);
			hArr.push(top+margin+childs[i].offsetHeight);
		}else{
			var minTop=Math.min.apply(null,hArr);
			var index=minIndex(minTop);
			childs[i].style.left=wArr[index]+"px";
			childs[i].style.top=hArr[index]+"px";
			hArr[index]+=childs[i].offsetHeight+margin;
		}
	}

	oparent.style.height=Math.max.apply(null,hArr)+"px";

	

	//获取最小top值的相应列数
	function minIndex(value){
		for(var i=0;i<hArr.length;i++){
			if(value==hArr[i]) return i;
		}
	}
}
//取得所有的数据块
	function getbycls(oparent,childcls){
		var allElements=oparent.getElementsByTagName("*");
		var childsElements=[];
		for(var i=0;i<allElements.length;i++){
			if(allElements[i].className==childcls) childsElements.push(allElements[i]);
		}
		return childsElements;
	}
}