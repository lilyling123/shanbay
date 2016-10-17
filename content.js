var newsTitle = $('.content__headline').text();
var newsImg = $('.responsive-img')[0].src;
var content = $('.content__article-body p')
var cont=[];
for(var i=0,j=content.length;i<j;i++){
	cont.push(content[i].text())
}
var news = {
	_Title:newsTitle,
	_Img:newsImg,
	_Content:cont
}
chrome.extension.sendMessage({cmd: "setNews",'arr':news},function(response) {
});
