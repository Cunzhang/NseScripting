// removes empty tags and tags with only non-breaking-spaces unlimited levels
function removeEmptyTags(html) {
	var re = /<[^(>|\/)]+>[ |	]*<\/[^>]+>/gi;
	while(re.test(html)) {
		html = html.replace(re,"");
		while(re.test(html)) {
			html = html.replace(re,"");
		}
	}
	return html;
}

// replaceAbsoluteUrls(): replaces absolute URL's with relative urls
// assuming the editor is in a level equal-to or above the image.
function replaceAbsoluteUrls(html) {
	var docLoc = document.location.toString();
	docLoc = docLoc.substring(0,docLoc.lastIndexOf("/")+1);
	docLoc = docLoc.replace(/\//gi,"\\\/");
	var re = eval("/"+docLoc+"/gi");
	return html.replace(re, "");
}

// replaceTags(): replace tags for better formatting
// set: [[tag,replacement],[tag,replacm....
function replaceTags(set, html) {
	var re;
	for(var i = 0; i < set.length; i++) {
		re = eval("/(<[\/]{0,1})"+set[i][0]+">/gi");
		html=html.replace(re,"$1"+set[i][1]+">");
	}
	return html
}

// codeSweeper(): apply several code-modifications
function codeSweeper() {
	var html = doc.innerHTML;
	//if (html) html = replaceCharacters(html);
	if (html) html = replaceAbsoluteUrls(html);
	// if (html) html = removeEmptyTags(html)
	if (html) html = replaceTags([["strong","B"],["em","I"]],html);
	return html;
}
