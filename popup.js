chrome.extension.sendMessage({cmd: "getNews"},function(response) {
if(response.arr){
// $('body').append("<br>"+response.arr+'<br>');
//$('#txt').text(response.arr);
	var _title = $("<h1>"+response.arr._Title+"</h1>");
	$('body').append(_title)
}
});
