var matcher = /inception/i;
var matchLength = 9; //I-N-C-E-P-T-I-O-N

var bwaaap = new Audio(chrome.extension.getURL('bwaaap.mp3'));

var nodeIterator = document.createNodeIterator(
	document.body,
	NodeFilter.SHOW_TEXT,
	{ 
		acceptNode : function (node) {
			if (matcher.test(node.data)) {
				return NodeFilter.FILTER_ACCEPT;
			}
			else {
				return NodeFilter.FILTER_REJECT;
			}
	}},
	true
);

var textNode;

while ((textNode = nodeIterator.nextNode()) != null) {
	var pos = textNode.data.search(matcher);
	console.log("found at pos " + pos, textNode)	
	window.matched = textNode;
	//You know, in case the DOM has been modified so that it doesn't match
	//in between the iterator testing and now. I laugh, but someone will do this.
	if (pos > 0) {
	    var secondNode = textNode.splitText(pos + matchLength);

	    var img = document.createElement('img');
		img.src = chrome.extension.getURL('bwaaap.png')
		img.addEventListener('click',function(ev) {
			bwaaap.play();
			ev.stopPropagation();
		}, false);
	
	    textNode.parentNode.insertBefore(img, secondNode);

		//The iterator should now hit secondNode
	}
}