chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
if(request.cmd=='setNews'){//由content.js传递来的信息保存在g_news中
g_news=request.arr;
}else if(request.cmd=='getNews'){//将g_news传递给popup.js
sendResponse({'arr':g_news});
}
})
//background.js是连接content.js和popup.js的桥梁