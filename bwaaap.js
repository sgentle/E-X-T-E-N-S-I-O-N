var matcher = /(i[\s_-]*n[\s_-]*c[\s_-]*e[\s_-]*p[\s_-]*t[\s_-]*i[\s_-]*o[\s_-]*n)/i;

var bwaaap = new Audio(chrome.extension.getURL('bwaaap.mp3'));

function onComplete() {
	var textNode;

	var nodeIterator = document.createNodeIterator(
		document.body,
		NodeFilter.SHOW_TEXT,
		{ 
			acceptNode : function (node) {
				if (matcher.test(node.data)) {
					return NodeFilter.FILTER_ACCEPT;
				}
				else {
					return NodeFilter.FILTER_SKIP;
				}
		}},
		true
	);

	while ((textNode = nodeIterator.nextNode()) != null) {
		var match = matcher.exec(textNode.data);
		
		//You know, in case the DOM has been modified so that it doesn't match
		//in between the iterator testing and now. I laugh, but someone will do this.
		if (match) {
		    var secondNode = textNode.splitText(match.index + match[0].length);

		    var img = document.createElement('img');
			img.src = chrome.extension.getURL('bwaaap.png')

			//in case CSS is trying to hide our beautiful image
			img.style.cssText = "display: inline; visibility: visible; opacity: 1";

			img.addEventListener('click',function(ev) {
				bwaaap.play();
				ev.stopPropagation();
			}, false);

	
		    textNode.parentNode.insertBefore(img, secondNode);

			//The iterator should now hit secondNode
		}
	}
}

//This code will be called after the DOM is loaded, but it could be before or after onload
//So we have to check both cases
if (document.readyState == "complete") {
	onComplete();
}
else {
	window.addEventListener('load', onComplete, false);
}

