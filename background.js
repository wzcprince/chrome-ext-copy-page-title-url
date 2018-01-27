

function get_tab_succinct_title(title)
{
    // [sək'sɪŋkt] 简洁的
    title = title.replace(" - 维基百科，自由的百科全书", "");
    title = title.replace(" - CSDN博客", "");
    // blog2017/network.md at master · wzcprince/blog2017
    if (-1 != title.indexOf("at master · wzcprince/blog2017"))
    {
        return ""
    }
    return title
}

function get_tab_original_url(url)
{
    // 我正在csdn编辑博客，此时的url地址是编辑器的地址，需要把此地址加工一下喽
    // 例如 http://mp.blog.csdn.net/mdeditor/index/79069418#virtio
    
    url = url.replace("mp.blog.csdn.net/mdeditor/index/", "blog.csdn.net/wzcprince/article/details/");
    return url
    
}

function copyURL() {
  chrome.tabs.getSelected(null, function(tab) {
    copyToClipboard(tab.url);    
    // console.log(tab.url);    
  });
}

function copyAllURL() {
var s = '';  
  chrome.tabs.getAllInWindow(null, function(tabs) {			
			for (var i=0; i < tabs.length; i++){
				s=s+tabs[i].url+"\r\n";
				copyToClipboard(s);
			}
      // console.log(s);
	})  
}

function copyTitle() {
  chrome.tabs.getSelected(null, function(tab) {
    copyToClipboard(tab.title); 
    // console.log(tab.title);       
  });
}

function copyAllTitle() {
var s = '';
  chrome.tabs.getAllInWindow(null, function(tabs) {
  			for (var i=0; i < tabs.length; i++){
			s=s+tabs[i].title+"\r\n";
			copyToClipboard(s);
			}			
	})
}

// Copy to the clipboard in text format
function copyTitleURL() {
    chrome.tabs.getSelected(null, function(tab) {
        // 2018年01月04日 适配markdown 哈哈
        // <https://www.w3schools.com/jsref/jsref_decodeuri.asp>
        // copyToClipboard( tab.title + "\n<" + decodeURI(tab.url) + ">\n<" + tab.url + ">");
        
        /* 2018年01月05日
         * 带中文的github链接，chrome地址栏显示的是 https://github.com/wzcprince/blog2017/blob/master/software-architecture.md#%E9%87%8D%E8%A6%81%E4%B9%A6%E7%B1%8D
         * decodeURI之后正常： 
         * blog2017/software-architecture.md at master · wzcprince/blog2017
         * <https://github.com/wzcprince/blog2017/blob/master/software-architecture.md#重要书籍
         * 
         * 带中文的 维基百科链接，chrome地址栏可以显示中文， https://zh.wikipedia.org/wiki/敏捷软件开发
         * decodeURI之后竟然也是正常的，哈哈哈哈哈哈哈哈哈
         * 敏捷软件开发 - 维基百科，自由的百科全书
         * <https://zh.wikipedia.org/wiki/敏捷软件开发
         */
         
        title = get_tab_succinct_title(tab.title)
        if (title.length > 16)
        {
            title += "\n";
        }
        else
        {
            title += " ";
        }
        copyToClipboard( title + "<" + get_tab_original_url(decodeURI(tab.url)) + ">");
        });
}


// URL 不加尖括号
function copyTitlePureURL() {
    chrome.tabs.getSelected(null, function(tab) {
         
        title = get_tab_succinct_title(tab.title)
        if (title.length > 16)
        {
            title += "\n";
        }
        else
        {
            title += " ";
        }
        copyToClipboard( title + "" + get_tab_original_url(decodeURI(tab.url)) + "");
        });
}
// Copy to the clipboard in text format
function copyTitleURLAsMarkdown() {
    chrome.tabs.getSelected(null, function(tab) {
        copyToClipboard( "[" + get_tab_succinct_title(tab.title) + "]" + "(" + get_tab_original_url(decodeURI(tab.url)) + ")");
        });
}


function copyAllTitleURL() {
var s = '';
  chrome.tabs.getAllInWindow(null, function(tabs) {
  			for (var i=0; i < tabs.length; i++){
			s=s+tabs[i].title + "\r\n" + tabs[i].url +"\r\n" +"\r\n";
			copyToClipboard(s);
			}
	})
}

// Copy to the clipboard in HTML format
function copyHTML() {
  chrome.tabs.getSelected(null, function(tab) {
    copyToClipboard("<A href='"+tab.url+"'>"+tab.title+"</A>\r\n");    
  });
}

function copyAllHTML() {
var s = '';
  chrome.tabs.getAllInWindow(null, function(tabs) {
  			for (var i=0; i < tabs.length; i++){
			s=s+"<A href='"+tabs[i].url+"'>"+tabs[i].title+"</A>\r\n";
  			copyToClipboard(s);
			}
  	})
}

function copyToClipboard(str) {
    var obj=document.getElementById("clipboard");

    if( obj ) {
        obj.value = str;
        obj.select();
        document.execCommand("copy", false, null);
    }
}

// Create the context menu.

var title="Copy Page Title and URL"
var parent = chrome.contextMenus.create({"title": title, "onclick": copyTitleURL});
var title="Copy Page Title and pure URL"
var parent = chrome.contextMenus.create({"title": title, "onclick": copyTitlePureURL});
var parent = chrome.contextMenus.create({"title": title, "onclick": copyTitlePureURL});
var title="Copy Page Title and URL As Markdown"
var parent = chrome.contextMenus.create({"title": title, "onclick": copyTitleURLAsMarkdown});
var parent = chrome.contextMenus.create({"title": title, "onclick": copyTitleURLAsMarkdown});



var title="Copy All URLs"
//var id = chrome.contextMenus.create({"title": title,"onclick": genericOnClick});
var parent = chrome.contextMenus.create({"title": title, "onclick": copyAllTitleURL});


chrome.commands.onCommand.addListener(function(command) {
	// 快捷键 参考 https://developer.chrome.com/apps/commands   https://developer.chrome.com/extensions/manifest 
	var commandName = command;
	if(commandName == "CopyPageTitleURL"){
		copyTitleURL(); //chrome.tabs.executeScript({file:"test_script.js"});
	}else{
		// do nothing
	}
});



/* var child1 = chrome.contextMenus.create(
  {"title": "Page Title", "parentId": parent, "onclick": copyAllTitle});
var child2 = chrome.contextMenus.create(
  {"title": "Simple URL", "parentId": parent, "onclick": copyAllURL});
var child3 = chrome.contextMenus.create(
  {"title": "Page Title and URL", "parentId": parent, "onclick": copyAllTitleURL});
var child4 = chrome.contextMenus.create(
  {"title": "HTML", "parentId": parent, "onclick": copyAllHTML});
 */
