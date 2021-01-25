window.addEventListener("mouseup", wordSelected);

function wordSelected() {
  var selectedText = window.getSelection().toString();
  if(selectedText.length > 0) {
      chrome.runtime.sendMessage(selectedText);
  }
  else {
  	chrome.runtime.sendMessage("");
  }
}

