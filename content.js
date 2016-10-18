var newsTitle = $('.content__headline').text();
var newsImg = $('.responsive-img')[0].src;
var content = $('.content__article-body').html()
// var cont=[];
// for(var i=0,j=content.length;i<j;i++){
// 	if(content.find('a')){

// 	}
// 	cont.push(content[i])
// }
// str.replace(/<[^>]+>/g,"")
var news = {
	_Title:newsTitle,
	_Img:newsImg,
	_Content:content.replace(/<aside[\s\S]*?<\/aside>/g,"").replace(/<[^>]+>/g,"").replace(/(\w+)/g,"<a href=\"#\">$1</a>")
}
chrome.extension.sendMessage({cmd: "setNews",'arr':news},function(response) {
});


































































































