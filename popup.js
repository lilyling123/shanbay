chrome.extension.sendMessage({cmd: "getNews"},function(response) {//接受来自background.js中的信息
if(response.arr){
	var _title = $("<h1>"+response.arr._Title+"</h1>");
	var _img = $("<div class=\"img\"><img src=\""+response.arr._Img+"\"></div>")
	var _content=response.arr._Content;	
	$('body').append(_title);
	$('body').append(_img);
	$('body').append(_content);//动态地把标题、图片、内容加载到popup.html中
}
});

//为所有a标签事件委托，弹出翻译框
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
  	wordexplain.css({"display":"block","top":_top+"px","left":_left+"px"});//设置弹出框样式
 		wordexplain.append($('<p><span>单词：'
															+e.target.text+
															'</span></p><p><span>中文意思：'
															+cn_explain+'</span></p><p><span>发音：'
															+pronunciate+'</span></p><audio controls="controls" src=\"'+
															audio+'\">你的浏览器不支持audio</audio>'))//弹出框中动态加载翻译、语音等
  })
});

$('body').on('click',function(e){
	$('.wordexplain').hide();
})//点击空白隐藏弹出框

