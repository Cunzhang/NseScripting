
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
// �������� (�й�)
//
////////////////////////////////////////////////////////////////////////////////

var o = locale["zh-cn"] = new Object;

	// Icon Titles (alt="")
	o["PostTopic"]			= "��������";
	o["Cut"]				= "����";
	o["Copy"]				= "����";
	o["Paste"]				= "ճ��";
	o["SpellCheck"]			= "�﷨ƴд���";
	o["SelectAll"]			= "ȫ��ѡ��";
	o["RemoveFormatting"]	= "ɾ����ʽ";
	o["InsertLink"]			= "���볬����";
	o["RemoveLink"]			= "ɾ��������";
	o["InsertImage"]		= "����ͼƬ";
	o["InsertTable"]		= "������";
	o["EditTable"]			= "�༭���";
	o["InsertLine"]			= "����ˮƽ��";
	o["About"]				= "����";
	o["Bold"]				= "�Ӵ�";
	o["Italic"]				= "��б";
	o["Underline"]			= "�»���";
	o["Strikethrough"]		= "ɾ����";
	o["AlignLeft"]			= "�����";
	o["Center"]				= "����";
	o["AlignRight"]			= "�Ҷ���";
	o["AlignBlock"]			= "���˶���";
	o["NumberedList"]		= "���";
	o["BulettedList"]		= "��Ŀ����";
	o["DecreaseIndent"]		= "����������";
	o["IncreaseIndent"]		= "����������";
	o["HistoryBack"]		= "����";
	o["HistoryForward"]		= "�ָ�";
	o["TextColor"]			= "������ɫ";
	o["BackgroundColor"]	= "������ɫ";

	o["RemoveColspan"]		= "��ֵ�Ԫ��(�ɶ���)";
	o["RemoveRowspan"]		= "��ֵ�Ԫ��(�ɶ���)";
	o["IncreaseColspan"]	= "�ϲ���Ԫ��(���Ҳ�)";
	o["IncreaseRowspan"]	= "�ϲ���Ԫ��(���·�)";
	o["AddColumn"]			= "������(���Ҳ�)";
	o["AddRow"]				= "������(���·�)";
	o["RemoveColumn"]		= "ɾ����";
	o["RemoveRow"]			= "ɾ����";

	// Label Text
	o["Style"]				= "��ʽ";
	o["Font"]				= "����";
	o["Size"]				= "�ֺ�";
	o["Source"]				= "Դ�ļ�";

	// Titles
	o["SourceTitle"]		= "�������鿴Դ�ļ�";

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
// Norwegian Bokm�l
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
	o["AlignRight"]			= "H�yrejustering";
	o["AlignBlock"]			= "Blokkjustering";
	o["NumberedList"]		= "Nummerert liste";
	o["BulettedList"]		= "Punktliste";
	o["DecreaseIndent"]		= "Mink innrykksverdi";
	o["IncreaseIndent"]		= "�k innrykksverdi";
	o["HistoryBack"]		= "Historie bakover";
	o["HistoryForward"]		= "Historie forover";
	o["TextColor"]			= "Tekstfarge";
	o["BackgroundColor"]	= "Bakgrunnsfarge";

	// Label Text
	o["Style"]				= "Stil";
	o["Font"]				= "Type";
	o["Size"]				= "St�rrelse";
	o["Source"]				= "Kilde";

	// Titles
	o["SourceTitle"]		= "Klikk her for � bytte mellom WYSIWYG og kilde modus.";

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
	o["Paste"]                      = "Einf�gen";
	o["SpellCheck"]                 = "Rechschreibpr�fung";
	o["SelectAll"]                  = "Alles markieren";
	o["RemoveFormatting"]           = "Formatierung entfernen";
	o["InsertLink"]                 = "Link einf�gen";
	o["RemoveLink"]                 = "Link entfernen";
	o["InsertImage"]                = "Bild einf�gen";
	o["InsertTable"]                = "Tabelle einf�gen";
	o["EditTable"]                  = "Tabelle bearbeiten";
	o["InsertLine"]                 = "Horizontale Linie einf�gen";
	o["InsertSmily"]                = "Smily 8-) einf�gen";
	o["InsertCharacter"]            = "Sonderzeichen einf�gen";
	o["About"]                      = "�ber Richtext Editor";
	o["Bold"]                       = "Fett";
	o["Italic"]                     = "Kursiv";
	o["Underline"]                  = "Unterstrichen";
	o["Strikethrough"]              = "Durchgestrichen";
	o["AlignLeft"]                  = "Linksb�ndig";
	o["Center"]                     = "Zentriert";
	o["AlignRight"]                 = "Rechtsb�ndig";
	o["AlignBlock"]                 = "Blocksatz";
	o["NumberedList"]               = "Nummerierung";
	o["BulettedList"]               = "Aufz�hlungszeichen";
	o["DecreaseIndent"]             = "Einzug verkleinern";
	o["IncreaseIndent"]             = "Einzug vergr��ern";
	o["HistoryBack"]                = "R�ckg�ngig";
	o["HistoryForward"]             = "Wiederherstellen";
	o["TextColor"]                  = "Zeichenfarbe";
	o["BackgroundColor"]            = "Hintergrundfarbe";

	// Label Text
	o["Style"]                      = "Absatzformat";
	o["Font"]                       = "Schriftart";
	o["Size"]                       = "Gr��e";
	o["Source"]                     = "Quelltext";

	// Titles
	o["SourceTitle"]                = "Hier klicken, um zwischen WYSIWYG- und Quelltext-Modus umzuschalten.";

	// Image Sources
	o["icon_post"]                  = "images/lang/de.icon_post.gif";

////////////////////////////////////////////////////////////////////////////////
//
// Fran�ais
//
////////////////////////////////////////////////////////////////////////////////

var o = locale["fr"] = new Object;

	// Icon Titles (alt="")
	o["PostTopic"]			= "Poster le sujet";
	o["Cut"]				= "Couper";
	o["Copy"]				= "Copier";
	o["Paste"]				= "Coller";
	o["Find Text"]			= "Rechercher";
	o["SpellCheck"]			= "V�rifier l'orthographe";
	o["SelectAll"]			= "S�lectionner tout";
	o["RemoveFormatting"]	= "Supprimer le formattage";
	o["InsertLink"]			= "Ins�rer un lien";
	o["RemoveLink"]			= "Supprimer un lien";
	o["InsertImage"]		= "Ins�rer une image";
	o["InsertTable"]		= "Ins�rer un tableau";
	o["EditTable"]			= "Editer le tableau";
	o["InsertLine"]			= "Ins�rer une ligne horizontale";
	o["InsertSmily"]		= "Ins�rer un Smiley 8-)";
	o["InsertCharacter"]	= "Ins�rer des caract�res sp�ciaux";
	o["About"]				= "A propos de Richtext Editor";
	o["Bold"]				= "Gras";
	o["Italic"]				= "Italique";
	o["Underline"]			= "Soulign";
	o["Strikethrough"]		= "Barr";
	o["AlignLeft"]			= "Align� � gauche";
	o["Center"]				= "Centr";
	o["AlignRight"]			= "Align� � droite";
	o["AlignBlock"]			= "Justifi";
	o["NumberedList"]		= "Liste num�rot�e";
	o["BulettedList"]		= "Liste � puces";
	o["DecreaseIndent"]		= "Diminuer le retrait";
	o["IncreaseIndent"]		= "Augmenter le retrait";
	o["HistoryBack"]		= "Annuler";
	o["HistoryForward"]		= "R�tablir";
	o["TextColor"]			= "Couleur du texte";
	o["BackgroundColor"]	= "Couleur de l'arri�re plan";

	o["RemoveColspan"]		= "Fractionner la cellule";
	o["RemoveRowspan"]		= "Fusionner la cellule";
	o["IncreaseColspan"]	= "Augmenter l'�tendue de la colonne";
	o["IncreaseRowspan"]	= "Augmenter l'�tendue de la ligne";
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
	o["SourceTitle"]		= "Cliquez ici pour basculer entre Aper�u et mode Source.";

	// Image Sources
	o["icon_post"]			= "images/icon_post.gif";
	
////////////////////////////////////////////////////////////////////////////////