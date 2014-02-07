
function URLSpecialChars(str)
{
   str=str.replace("%","%25");
   str=str.replace("+","%20");
   str=str.replace("/","%2F");
   str=str.replace("?","%3F");
   str=str.replace("#","%23");
   str=str.replace("&","%26");
   return str;
}
function fetchOffset(obj) {
	var left_offset = obj.offsetLeft;
	var top_offset = obj.offsetTop;
	while((obj = obj.offsetParent) != null) {
		left_offset += obj.offsetLeft;
		top_offset += obj.offsetTop;
	}
	return { 'left' : left_offset, 'top' : top_offset };
}

function new_req() {
	if (window.XMLHttpRequest) return new XMLHttpRequest;
	else if (window.ActiveXObject) {
		var req;
		try { req = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch (e) { try { req = new ActiveXObject("Microsoft.XMLHTTP"); }
		catch (e) { return null; }}
		return req;
	} else return null;
}

function get(url, args, fn, sync) {
	var req = new_req();
	if (args != "") args = "?" + args;
	req.open("GET", url + args, sync);
	req.onreadystatechange = function() { if (req.readyState == 4) fn(req);};
	req.send('');
}

function post(url, args, fn, sync)
{
   var req = new_req();
	req.open('POST', url,sync);
	req.setRequestHeader("Method", "POST " + url + " HTTP/1.1");
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() { 
			if (req.readyState == 4){
				var s;
				try {s = req.status;}catch (ex) {
						alert(ex.description);
				}
				if (s == 200)fn(req);
			}
	}
	req.send(args);
}