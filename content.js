var newsTitle = $('.content__headline').text();//取得网站标题
var newsImg = $('.responsive-img')[0].src;//取得网站图片地址
var content = $('.content__article-body').html()//取得网站内容html

var news = {
	_Title:newsTitle.replace(/(\w+)/g,"<a>$1</a>"),//给标题单词套上a标签
	_Img:newsImg,//图片地址
	_Content:content.replace(/<aside[\s\S]*?<\/aside>|<figure[\s\S]*?<\/figure>/g,"")//去除网站内容中可能出现<aside><figure>等非新闻主体内容的其他内容
									.replace(/<[^p][\s\S]*?>|<\/[^p]>/g,"")//将p标签内部存在的a标签去除，a标签里面的内容保留
									.replace(/(\w+)/g,"<a>$1</a>")//所有单词套上a标签
									.replace(/<<a>p<\/a>>/g,"<p>")//由于上个正则影响，这个使得<<a>p</a>>变成<p>
									.replace(/<\/<a>p<\/a>>/g,"</p>")//由于上上个正则影响，这个使得<</a>p</a>>变成</p>
}
chrome.extension.sendMessage({cmd: "setNews",'arr':news},function(response) {
});//chrome插件 content.js和background.js信息传递，此处cmd为setNews

//content.js是获取目的页面的脚本


































































































