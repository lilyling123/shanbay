chrome.extension.sendMessage({cmd: "getNews"},function(response) {//接受来自background.js中的信息
	if(response.arr){
		var _title = $("<h1 class=\"title\">"+response.arr._Title+"</h1>");
		var _img = $("<div class=\"img\"><img id=\"image\" src=\""+response.arr._Img+"\"></div>")
		var _content=response.arr._Content;
		$('body').append($("<div class=\"tem\"></div>"))	
		$('.tem').append(_title);
		$('.tem').append(_img);
		$('.tem').append(_content);//动态地把标题、图片、内容加载到临时div中
		var p=$('p');
		var arr_p=[];
		var p_height = 0;

		/*取出加载后各个p的高度，保存在数组中*/
		for(var i=0;i<p.length;i++){
			p_height+=p.eq(i).height();
			arr_p.push(p.eq(i).height()); 
		}

		/*图片加载后处理*/
		image.onload = function(){
	 		var title_img_hgt=$('img').height()+$('.title').height();//取出标题和图片高度和p总高度
	 		var totle_index = Math.ceil((p_height+title_img_hgt)/window.innerHeight);//计算所需页面数
	  	var single_page_height=0;
			$('body').append($("<div class=\"list\"></div>"));//
			$('body').append($("<span class=\"control control_l\">前一页</span><span class=\"control control_r\">后一页</span>"))
			$('.list').css({"width":totle_index*window.innerWidth+"px"});//设置list宽度
	 		for(var i=0;i<totle_index;i++){//分页
				if(i===0){//首页（有标题和图片）
					$('.list').append($('<div class="fl no_0"></div>'));
					$('.no_0').append(_title);
					$('.no_0').append(_img);
					for(var j=0;j<p.length;j++){
						if(single_page_height>window.innerHeight-title_img_hgt-150){//预留150个像素来放置控制按钮
							break;
						}else{
							$('.no_0').append(p[j]);
							single_page_height+=arr_p[j];
						}
					}
				}else{//非首页情况
					single_page_height=0;
					$('.list').append($("<div class=\"fl no_"+i+"\"></div>"));
					for(;j<p.length+1;j++){
						if(single_page_height>window.innerHeight-150){
							break;
						}else{
							$(".no_"+i).append(p[j]);
							single_page_height+=arr_p[j];
						}
					}
				}
			}	
			$('.tem').hide();//将临时div隐藏
			/*控制按钮对页面操作*/
			var animted=false;
			$('.control_l').click(function(){//左翻页
				if(parseInt($('.list').css("left"))>=0||animted)
				{
					return false;
				}else{
					animted=true;
					$('.list').animate({left:"+="+window.innerWidth+"px"},function(){animted=false})
				}
			})
			$('.control_r').click(function(){//右翻页
				//if(parseInt($('.list').css("left"))<0||animted)
				if(parseInt($('.list').css("left"))<=-window.innerWidth*(totle_index-1)||animted)
				{
					return false;
				}else{
					animted=true;
					$('.list').animate({left:"-="+window.innerWidth+"px"},function(){animted=false})
				}
			})
		}
	}
});

/*为所有a标签事件委托，弹出翻译框*/
$("body").delegate("a", "click", function(e){
	e.preventDefault();
	var cn_explain;
	var pronunciate;
	var audio;
	var wordexplain = $('.wordexplain');
	var _left;
	var _right;
  wordexplain.html("");//每次点击前 先清空弹出框中的内容
  $.get("https://api.shanbay.com/bdc/search/?word="+e.target.text,function(data){
  	cn_explain=data.data.cn_definition.defn;//ajax取出中文翻译
  	pronunciate=data.data.pronunciation;//ajax取出发音
  	audio=data.data.audio;//ajax取出语音地址
  	if( e.clientX + 350 > window.outerWidth ){//判断鼠标横坐标位置，太靠右使得弹出框left减小
  		_left = window.outerWidth - 350;
  	} else {
  		_left = e.clientX;
  	}
  	if( e.clientY + 140 > window.outerHeight ){//判断鼠标纵坐标位置，太靠下使得弹出框弹在上面
  		_top = e.clientY + document.body.scrollTop - 110;
  	} else {
  		_top = e.clientY+document.body.scrollTop+20;
  	}
  	$('body').append($('<div class=\"wordexplain\"></div>'))
  	wordexplain.css({"display":"block","top":_top+"px","left":_left+"px"});//设置弹出框样式
 		wordexplain.append($('<p><span>单词：'
											+e.target.text+
											'</span></p><p><span>中文意思：'
											+cn_explain+'</span></p><p><span>发音：'
											+pronunciate+'</span></p><audio controls="controls" src=\"'+
											audio+'\">你的浏览器不支持audio</audio>'))//弹出框中动态加载翻译、语音等
  })
});

/*点击空白隐藏弹出框*/
$('body').on('click',function(e){
	$('.wordexplain').hide();
})

