// DBG(): Get the debug window handle in a safe manaer.
function DBGGetWindow(el) {
	if (el) {
		// Debug window closed?
		try { el.className; } catch(e) {
			if (e.number == -2147418094) {
				return null;
			}
		}
	}
	return el;
}

// DBG(): Debug routine activated by the debugWindow property
function DBG(n, str)
{
	// Initialise debug functionality, first time in or if DBG() is called
	// with no arguments (as called from put_debugWindow).
	if (typeof(n) == "undefined" || !DBG.fInitialised) {
		var el = DBGGetWindow(public_description.debugWindow);
		if (el) {
			el.className = "debugWindow";
			el.innerHTML = '<table width="100%" id="debug">'
							+ '<tr><th>Seq</th><th>Caller</th><th>Debug</th></tr>'
							+ '</table>';
			DBG.idTable = el.all("debug");
		}
		DBG.fInitialised = true;
		DBG.seq = 0;
	}

	// If debug window supplied, then output debug message, assuming one was
	// supplied.
	if (typeof(str) != "undefined") {
		var el = DBGGetWindow(DBG.idTable);
		if (el) {
			var row = el.insertRow(1);
			var caller = DBG.caller.toString().substr(9);
			var cell = row.insertCell();
			cell.innerText = DBG.seq++;
			cell.nowrap = '';
			cell = row.insertCell();
			cell.innerText = caller.substr(0, caller.indexOf('\n'));
			cell.nowrap = '';
			row.insertCell().innerText = str;
		} else {
			// If no debug window, but RichEdit.debug is true, then output
			// debugs to status bar.
			if (RichEditor.debug) {
				window.status = str;
			}
		}
	}
}
