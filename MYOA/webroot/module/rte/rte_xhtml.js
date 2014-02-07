///////////////////////////////////////////////////////////////////////////
//
// Description:
//	Escape XHTML text
//

function escapeXHTML(str)
{
	return str.replace(/[&]/g, "&amp;")
			  .replace(/[<]/g, "&lt;")
			  .replace(/[>]/g, "&gt;")
			  ;
}

function escapeXHTMLAttribute(str)
{
	return str.replace(/[\"]/g, "&quot;");
}

///////////////////////////////////////////////////////////////////////////
//
// Description:
//	Return the XHTML attribute list (space separated) for the given element
//
// Notes:
//	The ignore list is a JavaScript Regular expression that matches those
//	attribute that should not be output.
//

function innerXHTMLAttributes(el, ignore)
{
	// Start with an empty attribute list
	var str = '';

	// Output attributes for the element
	for (var i = 0; i < el.attributes.length; i++)
	{
		// Get this attribute
		var attr = el.attributes[i];

		// Only output if it has a value of type string
		if (attr.nodeValue && typeof(attr.nodeValue) == "string")
		{
			// and it's not one we want to ignore
			if (!ignore || attr.nodeName.toLowerCase().search(ignore) == -1)
			{
				// Output the attribute (space separated if necessary)
				if (str.length) str += ' ';
				str += attr.nodeName.toLowerCase();
				str += '="' + escapeXHTMLAttribute(attr.nodeValue) + '"';
			}
		}
	}

	// Return the resulting attribute string
	return str;
}

///////////////////////////////////////////////////////////////////////////
//
// Description:
//	Get the inner XHTML from the supplied element.
//
// Return Value:
//	XHTML string
//
// Notes:
//	The ignore list is a JavaScript Regular expression that matches those
//	attribute that should not be output.
//

function innerXHTML(el, ignore)
{
	// Default innerXTHML is empty
	var str = '';

	// Create a text range for the element we are converting to source
	var r2; var r = document.body.createTextRange();
	r.moveToElementText(el);

	// Scan the child nodes of this element.
	for (var i = 0; i < el.children.length; i++)
	{
		// Create a text range for this child node
		r2 = document.body.createTextRange();
		r2.moveToElementText(el.children[i]);

		// Set the end of our range to the start of this child node.
		// so that r.text contains all the text up to this element.
		r.setEndPoint("EndToStart", r2);
		str += escapeXHTML(r.text);

		// Emit the child node
		str += outerXHTML(el.children[i], ignore);

		// Now, reset the text range for the main element and then move
		// the start point of our range to the end of the element just
		// output in preperation for the next chunk of text (or last chunk
		// if this was the last child node)
		r.moveToElementText(el);
		r.setEndPoint("StartToEnd", r2);
	}

	// Output the HTML (if any) plus the last chunk of text (again, if any).
	// Note: if no child nodes existed, the r.text contains the entire text
	// however, if child nodes did exist, then r.text contains just the 
	return str + escapeXHTML(r.text);
}

///////////////////////////////////////////////////////////////////////////
//
// Description:
//	Get the outer XHTML from the supplied element.
//
// Return Value:
//	XHTML string
//
// Notes:
//	The ignore list is a JavaScript Regular expression that matches those
//	attribute that should not be output.
//

function outerXHTML(el, ignore)
{
	// First, get the attribute values
	var attrs = innerXHTMLAttributes(el, ignore);

	// And any inner XHTML
	var inner = innerXHTML(el, ignore);

	// Then build the tag.	Note: We use the XML abbreviation if the element is empty
	return '<' + el.nodeName.toLowerCase()
			+ (attrs.length ? ' ' + attrs : '')
			+ (inner.length ? '>' + inner + '</' + el.nodeName.toLowerCase() + '>'
							: ' />');
}
