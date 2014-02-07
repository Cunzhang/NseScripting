
var locale = new Object;

// locale.getLanguage(): Called to work out what language to use.
locale.getLanguage = function()
{
	return locale.language ? locale.language : navigator.userLanguage;
}

// locale.getString(): Called to return the language variant of a @code string.
// this routin will fall back to en-us is no language variant is found.  If no
// english version exists, the code is returned.
locale.getString = function(str, lang)
{
	// If not supplied, pick up the language to use
	if (!lang) lang = locale.getLanguage();

	// Get references to required languages 
	if (!locale[lang])
	{
		lang = locale["zh-cn"];
	}
	else
	{
		lang = locale[lang];
	}

	// Find the end of the text code
	var i = str.indexOf('@{');
	while (i != -1)
	{
		// Find the closing } 
		var j = str.indexOf('}', i+1);

		// Extrace the language code
		var code = str.substr(i+2,j-i-2);

		// Return the language version of the text
		if (lang[code]) {
			str = str.substr(0,i) + lang[code] + str.substr(i+j+1);
		}
		// Find the next code if any
		i = str.indexOf('@{', i+1);
	}

	// Untranslated
	return str;
}

// locale.setLocale(): Called once the editor has loaded to replace all language
// codes in alt, title and innerText with thier language counterparts.
locale.setLocale = function()
{
	// Work out which language to apply
	var lang = locale.getLanguage();

	for (var i = 0; i < document.all.length; i++)
	{
		var el = document.all(i);
		if (el.alt && el.alt.indexOf('@{') != -1) {
			el.alt = locale.getString(el.alt, lang);
		}
		if (el.title && el.title.indexOf('@{') != -1) {
			el.title = locale.getString(el.title, lang);
		}
		if (el.src && el.src.indexOf('@{') != -1) {
			el.src = locale.getString(el.src, lang);
		}
		if (!el.children.length && el.innerText && el.innerText.indexOf('@{') != -1) {
			el.innerText = locale.getString(el.innerText, lang);
		}
	}
}

window.attachEvent("onload", locale.setLocale);

////////////////////////////////////////////////////////////////////////////////
//
// ¼òÌåÖÐÎÄ (ÖÐ¹ú)
//
////////////////////////////////////////////////////////////////////////////////

var o = locale["zh-cn"] = new Object;

	// Icon Titles (alt="")
	o["PostTopic"]			= "·¢²¼Ö÷Ìâ";
	o["Cut"]				= "¼ôÇÐ";
	o["Copy"]				= "¸´ÖÆ";
	o["Paste"]				= "Õ³Ìù";
	o["SpellCheck"]			= "Óï·¨Æ´Ð´¼ì²é";
	o["SelectAll"]			= "È«²¿Ñ¡Ôñ";
	o["RemoveFormatting"]	= "É¾³ý¸ñÊ½";
	o["InsertLink"]			= "²åÈë³¬Á´½Ó";
	o["RemoveLink"]			= "É¾³ý³¬Á´½Ó";
	o["InsertImage"]		= "²åÈëÍ¼Æ¬";
	o["InsertTable"]		= "²åÈë±í¸ñ";
	o["EditTable"]			= "±à¼­±í¸ñ";
	o["InsertLine"]			= "²åÈëË®Æ½Ïß";
	o["About"]				= "¹ØÓÚ";
	o["Bold"]				= "¼Ó´Ö";
	o["Italic"]				= "ÇãÐ±";
	o["Underline"]			= "ÏÂ»®Ïß";
	o["Strikethrough"]		= "É¾³ýÏß";
	o["AlignLeft"]			= "×ó¶ÔÆë";
	o["Center"]				= "¾ÓÖÐ";
	o["AlignRight"]			= "ÓÒ¶ÔÆë";
	o["AlignBlock"]			= "Á½¶Ë¶ÔÆë";
	o["NumberedList"]		= "±àºÅ";
	o["BulettedList"]		= "ÏîÄ¿·ûºÅ";
	o["DecreaseIndent"]		= "¼õÉÙËõ½øÁ¿";
	o["IncreaseIndent"]		= "Ôö¼ÓËõ½øÁ¿";
	o["HistoryBack"]		= "³·Ïú";
	o["HistoryForward"]		= "»Ö¸´";
	o["TextColor"]			= "×ÖÌåÑÕÉ«";
	o["BackgroundColor"]	= "±³¾°ÑÕÉ«";

	o["RemoveColspan"]		= "²ð·Öµ¥Ôª¸ñ(³É¶àÁÐ)";
	o["RemoveRowspan"]		= "²ð·Öµ¥Ôª¸ñ(³É¶àÐÐ)";
	o["IncreaseColspan"]	= "ºÏ²¢µ¥Ôª¸ñ(ÓëÓÒ²à)";
	o["IncreaseRowspan"]	= "ºÏ²¢µ¥Ôª¸ñ(ÓëÏÂ·½)";
	o["AddColumn"]			= "²åÈëÁÐ(ÔÚÓÒ²à)";
	o["AddRow"]				= "²åÈëÐÐ(ÔÚÏÂ·½)";
	o["RemoveColumn"]		= "É¾³ýÁÐ";
	o["RemoveRow"]			= "É¾³ýÐÐ";

	// Label Text
	o["Style"]				= "ÑùÊ½";
	o["Font"]				= "×ÖÌå";
	o["Size"]				= "×ÖºÅ";
	o["Source"]				= "Ô´ÎÄ¼þ";

	// Titles
	o["SourceTitle"]		= "µã»÷ÕâÀï²é¿´Ô´ÎÄ¼þ";

	// Image Sources
	o["icon_post"]			= "images/icon_post.gif";
	o["hdr_tables"]			= "images/hdr_tables.gif";
	
////////////////////////////////////////////////////////////////////////////////
//
// English (American & British)
//
////////////////////////////////////////////////////////////////////////////////

var o = locale["en-us"] = locale["en-gb"] = new Object;

	// Icon Titles (alt="")
	o["PostTopic"]			= "Post Topic";
	o["Cut"]				= "Cut";
	o["Copy"]				= "Copy";
	o["Paste"]				= "Paste";
	o["SpellCheck"]			= "Spell Check";
	o["SelectAll"]			= "Select All";
	o["RemoveFormatting"]	= "Remove Formatting";
	o["InsertLink"]			= "Insert Link";
	o["RemoveLink"]			= "Remove Link";
	o["InsertImage"]		= "Insert Image";
	o["InsertTable"]		= "Insert Table";
	o["EditTable"]			= "Edit Table";
	o["InsertLine"]			= "Insert Horizontal Line";
	o["InsertSmily"]		= "Insert Smily 8-)";
	o["InsertCharacter"]	= "Insert special character";
	o["About"]				= "About Richtext Editor";
	o["Bold"]				= "Bold";
	o["Italic"]				= "Italic";
	o["Underline"]			= "Underline";
	o["Strikethrough"]		= "Strikethrough";
	o["AlignLeft"]			= "Align Left";
	o["Center"]				= "Center";
	o["AlignRight"]			= "Align Right";
	o["AlignBlock"]			= "Align Block";
	o["NumberedList"]		= "Numbered List";
	o["BulettedList"]		= "Buletted List";
	o["DecreaseIndent"]		= "Decrease Indent";
	o["IncreaseIndent"]		= "Increase Indent";
	o["HistoryBack"]		= "History back";
	o["HistoryForward"]		= "History forward";
	o["TextColor"]			= "Text Color";
	o["BackgroundColor"]	= "Background Color";

	o["RemoveColspan"]		= "Remove Colspan";
	o["RemoveRowspan"]		= "Remove Rowspan";
	o["IncreaseColspan"]	= "Increase Colspan";
	o["IncreaseRowspan"]	= "Increase Rowspan";
	o["AddColumn"]			= "Add Column";
	o["AddRow"]				= "Add Row";
	o["RemoveColumn"]		= "Remove Column";
	o["RemoveRow"]			= "Remove Row";

	// Label Text
	o["Style"]				= "Style";
	o["Font"]				= "Font";
	o["Size"]				= "Size";
	o["Source"]				= "Source";

	// Titles
	o["SourceTitle"]		= "Click here to toggle between WYSIWYG and Source mode.";

	// Image Sources
	o["icon_post"]			= "images/icon_post.gif";
	o["hdr_tables"]			= "images/hdr_tables.gif";

////////////////////////////////////////////////////////////////////////////////
//
// Norwegian Bokmål
//
////////////////////////////////////////////////////////////////////////////////

o = locale["no"] = new Object;

	// Icon Titles (alt="")
	o["PostTopic"]			= "Send";
	o["Cut"]				= "Klipp";
	o["Copy"]				= "Kopier";
	o["Paste"]				= "Lim";
	o["SpellCheck"]			= "Stavekontroll";
	o["SelectAll"]			= "Marker alt";
	o["RemoveFormatting"]	= "Fjern formatering";
	o["InsertLink"]			= "Sett inn link";
	o["RemoveLink"]			= "Fjern link";
	o["InsertImage"]		= "Sett inn bilde";
	o["InsertTable"]		= "Sett inn tabell";
	o["EditTable"]			= "Endre tabell";
	o["InsertLine"]			= "Sett inn horisontal linje";
	o["InsertSmily"]		= "Sett inn smily 8-)";
	o["InsertCharacter"]	= "Sett inn spesialtegn";
	o["About"]				= "Om Richtext Editor";
	o["Bold"]				= "Fet";
	o["Italic"]				= "Kursiv";
	o["Underline"]			= "Understrekning";
	o["Strikethrough"]		= "Gjennomstrekning";
	o["AlignLeft"]			= "Venstrejustering";
	o["Center"]				= "Sentrering";
	o["AlignRight"]			= "Høyrejustering";
	o["AlignBlock"]			= "Blokkjustering";
	o["NumberedList"]		= "Nummerert liste";
	o["BulettedList"]		= "Punktliste";
	o["DecreaseIndent"]		= "Mink innrykksverdi";
	o["IncreaseIndent"]		= "Øk innrykksverdi";
	o["HistoryBack"]		= "Historie bakover";
	o["HistoryForward"]		= "Historie forover";
	o["TextColor"]			= "Tekstfarge";
	o["BackgroundColor"]	= "Bakgrunnsfarge";

	// Label Text
	o["Style"]				= "Stil";
	o["Font"]				= "Type";
	o["Size"]				= "Størrelse";
	o["Source"]				= "Kilde";

	// Titles
	o["SourceTitle"]		= "Klikk her for å bytte mellom WYSIWYG og kilde modus.";

	// Image Sources
	o["icon_post"]			= "images/lang/no.icon_post.gif";

////////////////////////////////////////////////////////////////////////////////
//
// German
//
////////////////////////////////////////////////////////////////////////////////

var o = locale["de"] = new Object;

	// Icon Titles (alt="")
	o["PostTopic"]                  = "Speichern";
	o["Cut"]                        = "Ausschneiden";
	o["Copy"]                       = "Kopieren";
	o["Paste"]                      = "Einfügen";
	o["SpellCheck"]                 = "Rechschreibprüfung";
	o["SelectAll"]                  = "Alles markieren";
	o["RemoveFormatting"]           = "Formatierung entfernen";
	o["InsertLink"]                 = "Link einfügen";
	o["RemoveLink"]                 = "Link entfernen";
	o["InsertImage"]                = "Bild einfügen";
	o["InsertTable"]                = "Tabelle einfügen";
	o["EditTable"]                  = "Tabelle bearbeiten";
	o["InsertLine"]                 = "Horizontale Linie einfügen";
	o["InsertSmily"]                = "Smily 8-) einfügen";
	o["InsertCharacter"]            = "Sonderzeichen einfügen";
	o["About"]                      = "Über Richtext Editor";
	o["Bold"]                       = "Fett";
	o["Italic"]                     = "Kursiv";
	o["Underline"]                  = "Unterstrichen";
	o["Strikethrough"]              = "Durchgestrichen";
	o["AlignLeft"]                  = "Linksbündig";
	o["Center"]                     = "Zentriert";
	o["AlignRight"]                 = "Rechtsbündig";
	o["AlignBlock"]                 = "Blocksatz";
	o["NumberedList"]               = "Nummerierung";
	o["BulettedList"]               = "Aufzählungszeichen";
	o["DecreaseIndent"]             = "Einzug verkleinern";
	o["IncreaseIndent"]             = "Einzug vergrößern";
	o["HistoryBack"]                = "Rückgängig";
	o["HistoryForward"]             = "Wiederherstellen";
	o["TextColor"]                  = "Zeichenfarbe";
	o["BackgroundColor"]            = "Hintergrundfarbe";

	// Label Text
	o["Style"]                      = "Absatzformat";
	o["Font"]                       = "Schriftart";
	o["Size"]                       = "Größe";
	o["Source"]                     = "Quelltext";

	// Titles
	o["SourceTitle"]                = "Hier klicken, um zwischen WYSIWYG- und Quelltext-Modus umzuschalten.";

	// Image Sources
	o["icon_post"]                  = "images/lang/de.icon_post.gif";

////////////////////////////////////////////////////////////////////////////////
//
// Français
//
////////////////////////////////////////////////////////////////////////////////

var o = locale["fr"] = new Object;

	// Icon Titles (alt="")
	o["PostTopic"]			= "Poster le sujet";
	o["Cut"]				= "Couper";
	o["Copy"]				= "Copier";
	o["Paste"]				= "Coller";
	o["Find Text"]			= "Rechercher";
	o["SpellCheck"]			= "Vérifier l'orthographe";
	o["SelectAll"]			= "Sélectionner tout";
	o["RemoveFormatting"]	= "Supprimer le formattage";
	o["InsertLink"]			= "Insérer un lien";
	o["RemoveLink"]			= "Supprimer un lien";
	o["InsertImage"]		= "Insérer une image";
	o["InsertTable"]		= "Insérer un tableau";
	o["EditTable"]			= "Editer le tableau";
	o["InsertLine"]			= "Insérer une ligne horizontale";
	o["InsertSmily"]		= "Insérer un Smiley 8-)";
	o["InsertCharacter"]	= "Insérer des caractères spéciaux";
	o["About"]				= "A propos de Richtext Editor";
	o["Bold"]				= "Gras";
	o["Italic"]				= "Italique";
	o["Underline"]			= "Soulign";
	o["Strikethrough"]		= "Barr";
	o["AlignLeft"]			= "Aligné à gauche";
	o["Center"]				= "Centr";
	o["AlignRight"]			= "Aligné à droite";
	o["AlignBlock"]			= "Justifi";
	o["NumberedList"]		= "Liste numérotée";
	o["BulettedList"]		= "Liste à puces";
	o["DecreaseIndent"]		= "Diminuer le retrait";
	o["IncreaseIndent"]		= "Augmenter le retrait";
	o["HistoryBack"]		= "Annuler";
	o["HistoryForward"]		= "Rétablir";
	o["TextColor"]			= "Couleur du texte";
	o["BackgroundColor"]	= "Couleur de l'arrière plan";

	o["RemoveColspan"]		= "Fractionner la cellule";
	o["RemoveRowspan"]		= "Fusionner la cellule";
	o["IncreaseColspan"]	= "Augmenter l'étendue de la colonne";
	o["IncreaseRowspan"]	= "Augmenter l'étendue de la ligne";
	o["AddColumn"]			= "Ajouter une colonne";
	o["AddRow"]				= "Ajouter une ligne";
	o["RemoveColumn"]		= "Supprimer une colonne";
	o["RemoveRow"]			= "Supprimer une ligne";

	// Label Text
	o["Style"]				= "Style";
	o["Font"]				= "Police";
	o["Size"]				= "Taille";
	o["Source"]				= "Code source";

	// Titles
	o["SourceTitle"]		= "Cliquez ici pour basculer entre Aperçu et mode Source.";

	// Image Sources
	o["icon_post"]			= "images/icon_post.gif";
	
////////////////////////////////////////////////////////////////////////////////