chrome.extension.sendMessage({cmd: "getNews"},function(response) {
if(response.arr){
	var _title = $("<h1>"+response.arr._Title+"</h1>");
	var _img = $("<div class=\"img\"><img src=\""+response.arr._Img+"\"></div>")
	var _content=response.arr._Content;	
	$('body').append(_title);
	$('body').append(_img);
	$('body').append(_content);
}
});

$("body").delegate("a", "click", function(e){
	e.preventDefault();
	var cn_explain;
	var pronunciate;
  $('.wordexplain').html("");
  $.get("https://api.shanbay.com/bdc/search/?word="+e.target.text,function(data){
  	cn_explain=data.data.cn_definition.defn;
  	pronunciate=data.data.pronunciation;
  	_top=(e.clientY+document.body.scrollTop+20)+"px";
  	_left=(e.clientX+20)+"px";
  	$('.wordexplain').css({"display":"block","top":_top,"left":_left});
 		$('.wordexplain').append($('<p><span>单词：'
 																						+e.target.text+
 																						'</span></p><p><span>中文意思：'
 																						+cn_explain+'</span></p><p><span>发音：'
 																						+pronunciate+'</span></p>'))
  })
});

