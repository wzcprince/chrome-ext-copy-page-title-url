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
    copyToClipboard( tab.title + "\n" + tab.url );    
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
var parent = chrome.contextMenus.create({"title": title, "onclick": copyTitleURL});
var parent = chrome.contextMenus.create({"title": title, "onclick": copyTitleURL});



var title="Copy All URLs"
//var id = chrome.contextMenus.create({"title": title,"onclick": genericOnClick});
var parent = chrome.contextMenus.create({"title": title, "onclick": copyAllTitleURL});


chrome.commands.onCommand.addListener(function(command) {
	// 快捷键
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