chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
if(request.cmd=='setNews'){
g_news=request.arr;
}else if(request.cmd=='getNews'){
sendResponse({'arr':g_news});
}
})
