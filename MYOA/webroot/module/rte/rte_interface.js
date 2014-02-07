// object:		RichEditor()
// description: This object provides the interface to the calling page.
function RichEditor()
{
   var selectedImage = null; // currently selected image

	this.put_docHtml			= put_docHtml;
	this.get_docHtml			= get_docHtml;			// OZ
	this.get_docXHtml			= get_docXHtml;			// OZ
	this.put_defaultFont		= put_defaultFont;
	this.put_defaultFontSize	= put_defaultFontSize;
	this.put_styleData			= put_styleData;		// LEON
	this.put_options			= put_options;
	this.addField				= addField;
	this.getValue				= getValue;
	this.put_debugWindow		= put_debugWindow;		// OZ
}

// property:	docHtml
// access:		read/write
// description: Set this property to define the initial HTML to be
//				edited.
// author:		austin.france@ramesys.com
function put_docHtml(passedValue) {
	var r = document.selection.createRange();
	doc.innerHTML = passedValue;
	r.collapse(true);
	r.select();

	// Only if editor initialisation has completed (and therfore visible)
	if (editor.style.visibility == "visible") {
		doc.focus();
		reset();
	}
}

function get_docHtml() {
	return doc.innerHTML;
}

// property:	docXHtml
// access:		read only
// description: Return an XHTML representation of the document.  
// author:		austin.france@ramesys.com
function get_docXHtml() {								// OZ
	// Ignore any contenteditable attributes seen as these are 
	// inherited from the editor and not relevent to the document
	// HTML.
	return innerXHTML(doc, new RegExp("contenteditable"));
}

// property:	defaultFont
// access:		write only
// description:	Sets the default font for the editor.  The default
//				if this is not specified is whatever the microsoft
//				html editing component decides (Times New Roman
//				typically)
// author:		austin.france@ramesys.com
function put_defaultFont(passedValue) {
	doc.style.fontFamily = passedValue;
}

// property:	defaultFontSize
// access:		write only
// description:	Sets the default font size for the editor.
// author:		austin.france@ramesys.com
function put_defaultFontSize(passedValue) {
	switch(passedValue) {
	case "1": passedValue = "xx-small"; break;
	case "2": passedValue = "x-small";	break;
	case "3": passedValue = "small";	break;
	case "4": passedValue = "medium";	break;
	case "5": passedValue = "large";	break;
	case "6": passedValue = "x-large";	break;
	case "7": passedValue = "xx-large";	break;
	}
	doc.style.fontSize = passedValue;
}

// property:	styleData
// access:		writeOnly
// description:	Defines extended style data for the style dropdown
// author:		leonreinders@hetnet.nl
function put_styleData(passedValue) {

	var a,b;

	// Define the default style list
	this.styleList = [
		// element		description			Active
		[null,			"普通",			0],
		[null,			"标题 1",		0],
		[null,			"标题 2",		0],
		[null,			"标题 3",		0],
		[null,			"标题 4",		0],
		[null,			"标题 5",		0],
		[null,			"标题 6",		0],
		[null,			"地址",			0],
		[null,			"格式",			0],
		["BLOCKQUOTE",		"向右缩排",		0],
		["CITE",		"引用",			0],
		["BDO",			"反向",			0],
		["BIG",			"字体加大",		0],
		["SMALL",		"字体缩小",		0],
		["DIV",			"排版",			0],
		["SUP",			"上标",			0],
		["SUB",			"下标",			0]
	];

	// Add the passed styles to the documents stylesheet
	for (var i = 0; passedValue && i < passedValue.length; i++)
	{
		for (var j = 0; j < passedValue[i].rules.length; j++)
		{
			// Extract the rule and the rule definition from the passed style
			// data.
			a = passedValue[i].rules[j].selectorText.toString().toLowerCase();
			b = passedValue[i].rules[j].style.cssText.toLowerCase();

			// Ignore non-style entries
			if (!a || !b) continue;

			// Add this rule to our style sheet
			document.styleSheets[0].addRule(a,b);

			// Id: These are added to the document style sheet but are not
			// available in the style dropdown
			if (a.indexOf("#") != -1) {
				continue;
			}

			// Class: Append a cless element to the style list
			if (a.indexOf(".") == 0) {
				this.styleList[this.styleList.length] = [a, "Class " + a, 1];
			}

			// SubClass: Append the sub-class to the style list
			else if(a.indexOf(".") > 0) {
				this.styleList[this.styleList.length] = [a, a, 1];
			}

			// Otherwise, assume it's a tag and select the existing tag entry
			// in the style list.
			else {
				for (var k = 0; k < this.styleList.length; k++) {
					if (this.styleList[k][0] == a) {
						this.styleList[k][2] = 1;
						break;
					}
				}
			}
		}
	}

	// Initialise the style dropdown with the new style list
	initStyleDropdown(this.styleList);
}

function addField(name, label, maxlen, value, size) {
	var row = rebarBottom.parentElement.insertRow(rebarBottom.rowIndex);
	var cell = row.insertCell();
	cell.className = 'rebar';
	cell.width = '100%';
	cell.innerHTML = '<nobr width="100%"><span class="field" width="100%">'
						+ '<img class="spacer" src="spacer.gif" width="2">'
						+ '<span class="start"></span>'
						+ '<span class="label">' + label + ':</span>'
						+ '&nbsp;<input class="field" type="text"'
							+ ' name="' + name + '" maxlength="' + maxlen + '"'
								+ (value ? ' value="' + value + '"' : '')
								+ 'size="' + (size ? size : 58) + '"'
								+ '>&nbsp;'
						+ '</span>'
						+ '</nobr>';
}

function getValue(name) {
	return document.all(name).value;
}

// property:	options
// access:		writeOnly
// description:	Sets options for the editor.  Used by the editor to control
//				certain features
//
//				viewsource=<true|false>;...
//
// author:		austin.france@ramesys.com
function put_options(passedValue) {
	this.options = passedValue;
	applyOptions(this.options);
}

// property:	debugWindow
// access:		writeOnly
// description:	Tells the editor to emit debugs to the debug window.
// author:		austin.france@ramesys.com
function put_debugWindow(passedValue) {
	this.debugWindow = passedValue;
	DBG();
}
