var history = new Object;
history.items = [];
history.cursor = -1;

// saveHistory(): Saves a copy of the document in the history.items.items buffer
function saveHistory() {
	if (!getOption("history")) return;
	codeSweeper();
	history.items[history.items.length] = doc.innerHTML;
	history.cursor = history.items.length;
	// window.status = 'saveHistory() cursor=' + history.cursor + ', items = ' + history.items.length;
	showHistory();
}

// goHistory(): Advance or retreat the history.items.items cursor and show the
// document as it was at that point in time.
function goHistory(value) {

	if (!RichEditor.txtView) return;
	switch(value) {
	case -1:
		i = history.cursor - 1;
		// when first start undoing, save final state at end of history buffer
		// so it can be re-done.
		if (history.cursor == history.items.length) {
			saveHistory();
		}
		history.cursor = i;
		break;
	case 1:
		history.cursor ++;
		break;
	}
	if (history.items[history.cursor]) {
		doc.innerHTML = history.items[history.cursor];
	}
	// window.status = 'goHistory(' + value + ') cursor=' + history.cursor + ', items = ' + history.items.length;
	showHistory()
}

// showHistory(): enable and disable the history.items buttons as appropriate
function showHistory() {

	if (history.cursor > 0) {
		btnPrev.className = "";
		btnPrev.disabled = false;
	} else {
		btnPrev.className = "disabled";
		btnPrev.disabled = true;
	}

	if (history.cursor < history.items.length - 1) {
		btnNext.className = "";
		btnNext.disabled = false;
	} else {
		btnNext.className = "disabled";
		btnNext.disabled = true;
	}
}
