var newsTitle=$('.content__headline').text();
var newsImg=$('.responsive-img')[0].src;
var news = {
	_Title:newsTitle,
	_Img:newsImg
}
chrome.extension.sendMessage({cmd: "setNews",'arr':news},function(response) {
});
