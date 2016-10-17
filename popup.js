chrome.extension.sendMessage({cmd: "getNews"},function(response) {
if(response.arr){
// $('body').append("<br>"+response.arr+'<br>');
//$('#txt').text(response.arr);
	var _title = $("<h1>"+response.arr._Title+"</h1>");
	var _img = $("<img src=\""+response.arr._Img+"\">")
	var _content;
	// for(var i=0;i<response.arr._Content.length;i++){
	// 	_content=_content+"<p>"+response.arr._Content[i]+"</p>"
	// }
	$('body').append(_title);
	$('body').append(_img);
	//$('body').append(_content);
}
});
