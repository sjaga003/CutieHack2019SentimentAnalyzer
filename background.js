chrome.runtime.onMessage.addListener(receiveMessage);

var selectedText = "";

function receiveMessage(message, sender, sendResponse) {
  selectedText = message;
}