
TDConfig.CustomConfigurationsPath = '' ;

TDConfig.BasePath='/module/editor/';
TDConfig.EditorAreaCSS = TDConfig.BasePath + 'css/editorarea.css' ;
TDConfig.EditorAreaStyles = '' ;
TDConfig.ToolbarComboPreviewCSS = '' ;

TDConfig.DocType = '' ;

TDConfig.BaseHref = '' ;

TDConfig.FullPage = false ;

// The following option determines whether the "Show Blocks" feature is enabled or not at startup.
TDConfig.StartupShowBlocks = false ;

TDConfig.Debug = false ;
TDConfig.AllowQueryStringDebug = true ;

TDConfig.SkinPath = TDConfig.BasePath + 'skins/default/' ;
TDConfig.PreloadImages = [ TDConfig.SkinPath + 'images/toolbar.start.gif', TDConfig.SkinPath + 'images/toolbar.buttonarrow.gif' ] ;

TDConfig.PluginsPath = TDConfig.BasePath + 'plugins/' ;

// TDConfig.Plugins.Add( 'autogrow' ) ;
// TDConfig.Plugins.Add( 'dragresizetable' );
TDConfig.AutoGrowMax = 400 ;

// TDConfig.ProtectedSource.Add( /<%[\s\S]*?%>/g ) ;	// ASP style server side code <%...%>
// TDConfig.ProtectedSource.Add( /<\?[\s\S]*?\?>/g ) ;	// PHP style server side code
// TDConfig.ProtectedSource.Add( /(<asp:[^\>]+>[\s|\S]*?<\/asp:[^\>]+>)|(<asp:[^\>]+\/>)/gi ) ;	// ASP.Net style tags <asp:control>

TDConfig.AutoDetectLanguage	= false ;
TDConfig.DefaultLanguage		= 'zh-cn' ;
TDConfig.ContentLangDirection	= 'ltr' ;

TDConfig.ProcessHTMLEntities	= false ;
TDConfig.IncludeLatinEntities	= true ;
TDConfig.IncludeGreekEntities	= true ;

TDConfig.ProcessNumericEntities = false ;

TDConfig.AdditionalNumericEntities = ''  ;		// Single Quote: "'"

TDConfig.FillEmptyBlocks	= true ;

TDConfig.FormatSource		= true ;
TDConfig.FormatOutput		= true ;
TDConfig.FormatIndentator	= '    ' ;

TDConfig.GeckoUseSPAN	= false ;
TDConfig.StartupFocus	= false ;
TDConfig.ForcePasteAsPlainText	= false ;
TDConfig.AutoDetectPasteFromWord = true ;	// IE only.
TDConfig.ShowDropDialog = true ;
TDConfig.ForceSimpleAmpersand	= false ;
TDConfig.TabSpaces		= 0 ;
TDConfig.ShowBorders	= false ;
TDConfig.SourcePopup	= false ;
TDConfig.ToolbarStartExpanded	= true ;
TDConfig.ToolbarCanCollapse	= false ;
TDConfig.IgnoreEmptyParagraphValue = true ;
TDConfig.PreserveSessionOnFileBrowser = false ;
TDConfig.FloatingPanelsZIndex = 10000 ;
TDConfig.HtmlEncodeOutput = false ;

TDConfig.TemplateReplaceAll = true ;
TDConfig.TemplateReplaceCheckbox = true ;

TDConfig.ToolbarLocation = 'In' ;

TDConfig.ToolbarSets["Default"] = [
	['Cut','Copy','Paste','PasteText','PasteWord'],
	['Undo','Redo','-','Find','Replace'],
	['FontFormat','FontName','FontSize'],
	['TextColor','BGColor'],
	['Templates','Preview','Source','FitWindow'],
	'/',
	['Bold','Italic','Underline','StrikeThrough','-','Subscript','Superscript'],
	['OrderedList','UnorderedList','-','Outdent','Indent'],
	['JustifyLeft','JustifyCenter','JustifyRight','JustifyFull'],
	['Link','Unlink','Anchor'],
	['Image','Flash','Table','Rule','SpecialChar']
] ;

TDConfig.ToolbarSets["Basic"] = [
	['Bold','Italic','OrderedList','UnorderedList','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','-','Link','Unlink','-','FontFormat','FontName','FontSize','TextColor','Image','-','Templates','Source','FitWindow']
] ;

TDConfig.EnterMode = 'br' ;			// p | div | br
TDConfig.ShiftEnterMode = 'p' ;	// p | div | br

TDConfig.Keystrokes = [
	[ CTRL + 65 /*A*/, true ],
	[ CTRL + 67 /*C*/, true ],
	[ CTRL + 70 /*F*/, true ],
	[ CTRL + 83 /*S*/, true ],
	[ CTRL + 88 /*X*/, true ],
	[ CTRL + 86 /*V*/, 'Paste' ],
	[ SHIFT + 45 /*INS*/, 'Paste' ],
	[ CTRL + 88 /*X*/, 'Cut' ],
	[ SHIFT + 46 /*DEL*/, 'Cut' ],
	[ CTRL + 90 /*Z*/, 'Undo' ],
	[ CTRL + 89 /*Y*/, 'Redo' ],
	[ CTRL + SHIFT + 90 /*Z*/, 'Redo' ],
	[ CTRL + 76 /*L*/, 'Link' ],
	[ CTRL + 66 /*B*/, 'Bold' ],
	[ CTRL + 73 /*I*/, 'Italic' ],
	[ CTRL + 85 /*U*/, 'Underline' ],
	[ CTRL + SHIFT + 83 /*S*/, 'Save' ],
	[ CTRL + ALT + 13 /*ENTER*/, 'FitWindow' ],
	[ CTRL + 9 /*TAB*/, 'Source' ]
] ;

TDConfig.ContextMenu = ['Generic','Link','Anchor','Image','Flash','Select','Textarea','Checkbox','Radio','TextField','HiddenField','ImageButton','Button','BulletedList','NumberedList','Table','Form'] ;
TDConfig.BrowserContextMenuOnCtrl = false ;

TDConfig.EnableMoreFontColors = true ;
TDConfig.FontColors = '000000,993300,333300,003300,003366,000080,333399,333333,800000,FF6600,808000,808080,008080,0000FF,666699,808080,FF0000,FF9900,99CC00,339966,33CCCC,3366FF,800080,999999,FF00FF,FFCC00,FFFF00,00FF00,00FFFF,00CCFF,993366,C0C0C0,FF99CC,FFCC99,FFFF99,CCFFCC,CCFFFF,99CCFF,CC99FF,FFFFFF' ;

TDConfig.FontFormats	= 'p;h1;h2;h3;h4;h5;h6;pre;address;div' ;
TDConfig.FontNames		= '宋体;新宋体;仿宋体;黑体;楷体;隶书;幼圆;Arial;Comic Sans MS;Courier New;Fixedsys;Georgia;Tahoma;Times New Roman;Verdana;' ;
TDConfig.FontSizes		= 'smaller;larger;xx-small;x-small;small;medium;large;x-large;xx-large' ;

TDConfig.StylesXmlPath		= TDConfig.BasePath + 'styles.xml' ;
TDConfig.TemplatesXmlPath	= '/module/html_model/view/xml.php' ;

TDConfig.SpellChecker			= 'ieSpell' ;	// 'ieSpell' | 'SpellerPages'
TDConfig.IeSpellDownloadUrl	= 'http://www.iespell.com/download.php' ;
TDConfig.SpellerPagesServerScript = 'server-scripts/spellchecker.php' ;	// Available extension: .php .cfm .pl
TDConfig.FirefoxSpellChecker	= false ;

TDConfig.MaxUndoLevels = 15 ;

TDConfig.DisableObjectResizing = false ;
TDConfig.DisableFFTableHandles = true ;

TDConfig.LinkDlgHideTarget		= false ;
TDConfig.LinkDlgHideAdvanced	= false ;

TDConfig.ImageDlgHideLink		= false ;
TDConfig.ImageDlgHideAdvanced	= false ;

TDConfig.FlashDlgHideAdvanced	= false ;

TDConfig.ProtectedTags = '' ;

// This will be applied to the body element of the editor
TDConfig.BodyId = '' ;
TDConfig.BodyClass = '' ;

TDConfig.DefaultStyleLabel = '' ;
TDConfig.DefaultFontFormatLabel = '' ;
TDConfig.DefaultFontLabel = '' ;
TDConfig.DefaultFontSizeLabel = '' ;

TDConfig.DefaultLinkTarget = '' ;

// The option switches between trying to keep the html structure or do the changes so the content looks like it was in Word
TDConfig.CleanWordKeepsStructure = false ;

// Only inline elements are valid.
TDConfig.RemoveFormatTags = 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var' ;

TDConfig.CustomStyles = 
{
	'Red Title'	: { Element : 'h3', Styles : { 'color' : 'Red' } }
};

// Do not add, rename or remove styles here. Only apply definition changes.
TDConfig.CoreStyles = 
{
	// Basic Inline Styles.
	'Bold'			: { Element : 'b', Overrides : 'strong' },
	'Italic'		: { Element : 'i', Overrides : 'em' },
	'Underline'		: { Element : 'u' },
	'StrikeThrough'	: { Element : 'strike' },
	'Subscript'		: { Element : 'sub' },
	'Superscript'	: { Element : 'sup' },
	
	// Basic Block Styles (Font Format Combo).
	'p'				: { Element : 'p' },
	'div'			: { Element : 'div' },
	'pre'			: { Element : 'pre' },
	'address'		: { Element : 'address' },
	'h1'			: { Element : 'h1' },
	'h2'			: { Element : 'h2' },
	'h3'			: { Element : 'h3' },
	'h4'			: { Element : 'h4' },
	'h5'			: { Element : 'h5' },
	'h6'			: { Element : 'h6' },
	
	// Other formatting features.
	'FontFace' : 
	{ 
		Element		: 'span', 
		Styles		: { 'font-family' : '#("Font")' }, 
		Overrides	: [ { Element : 'font', Attributes : { 'face' : null } } ]
	},
	
	'Size' :
	{ 
		Element		: 'span', 
		Styles		: { 'font-size' : '#("Size","fontSize")' }, 
		Overrides	: [ { Element : 'font', Attributes : { 'size' : null } } ]
	},
	
	'Color' :
	{ 
		Element		: 'span', 
		Styles		: { 'color' : '#("Color","color")' }, 
		Overrides	: [ { Element : 'font', Attributes : { 'color' : null } } ]
	},
	
	'BackColor'		: { Element : 'span', Styles : { 'background-color' : '#("Color","color")' } }
};

// The distance of an indentation step.
TDConfig.IndentLength = 40 ;
TDConfig.IndentUnit = 'px' ;

// Alternatively, TDeditor allows the use of CSS classes for block indentation.
// This overrides the IndentLength/IndentUnit settings.
TDConfig.IndentClasses = [] ;

// [ Left, Center, Right, Justified ]
TDConfig.JustifyClasses = [] ;

// The following value defines which File Browser connector and Quick Upload
// "uploader" to use. It is valid for the default implementaion and it is here
// just to make this configuration file cleaner.
// It is not possible to change this value using an external file or even
// inline when creating the editor instance. In that cases you must set the
// values of LinkBrowserURL, ImageBrowserURL and so on.
// Custom implementations should just ignore it.
var _FileBrowserLanguage	= 'php' ;	// asp | aspx | cfm | lasso | perl | php | py
var _QuickUploadLanguage	= 'php' ;	// asp | aspx | cfm | lasso | perl | php | py

// Don't care about the following two lines. It just calculates the correct connector
// extension to use for the default File Browser (Perl uses "cgi").
var _FileBrowserExtension = _FileBrowserLanguage == 'perl' ? 'cgi' : _FileBrowserLanguage ;
var _QuickUploadExtension = _QuickUploadLanguage == 'perl' ? 'cgi' : _QuickUploadLanguage ;

TDConfig.LinkBrowser = false ;
TDConfig.LinkBrowserURL = TDConfig.BasePath + 'filemanager/browser/default/browser.html?Connector=../../connectors/' + _FileBrowserLanguage + '/connector.' + _FileBrowserExtension ;
TDConfig.LinkBrowserWindowWidth	= TDConfig.ScreenWidth * 0.7 ;		// 70%
TDConfig.LinkBrowserWindowHeight	= TDConfig.ScreenHeight * 0.7 ;	// 70%

TDConfig.ImageBrowser = false ;
TDConfig.ImageBrowserURL = TDConfig.BasePath + 'filemanager/browser/default/browser.html?Type=Image&Connector=../../connectors/' + _FileBrowserLanguage + '/connector.' + _FileBrowserExtension ;
TDConfig.ImageBrowserWindowWidth  = TDConfig.ScreenWidth * 0.7 ;	// 70% ;
TDConfig.ImageBrowserWindowHeight = TDConfig.ScreenHeight * 0.7 ;	// 70% ;

TDConfig.FlashBrowser = false ;
TDConfig.FlashBrowserURL = TDConfig.BasePath + 'filemanager/browser/default/browser.html?Type=Flash&Connector=../../connectors/' + _FileBrowserLanguage + '/connector.' + _FileBrowserExtension ;
TDConfig.FlashBrowserWindowWidth  = TDConfig.ScreenWidth * 0.7 ;	//70% ;
TDConfig.FlashBrowserWindowHeight = TDConfig.ScreenHeight * 0.7 ;	//70% ;

TDConfig.LinkUpload = false ;
TDConfig.LinkUploadURL = TDConfig.BasePath + 'filemanager/connectors/' + _QuickUploadLanguage + '/upload.' + _QuickUploadExtension ;
TDConfig.LinkUploadAllowedExtensions	= ".(7z|aiff|asf|avi|bmp|csv|doc|fla|flv|gif|gz|gzip|jpeg|jpg|mid|mov|mp3|mp4|mpc|mpeg|mpg|ods|odt|pdf|png|ppt|pxd|qt|ram|rar|rm|rmi|rmvb|rtf|sdc|sitd|swf|sxc|sxw|tar|tgz|tif|tiff|txt|vsd|wav|wma|wmv|xls|xml|zip)$" ;			// empty for all
TDConfig.LinkUploadDeniedExtensions	= "" ;	// empty for no one

TDConfig.ImageUpload = false ;
TDConfig.ImageUploadURL = TDConfig.BasePath + 'filemanager/connectors/' + _QuickUploadLanguage + '/upload.' + _QuickUploadExtension + '?Type=Image' ;
TDConfig.ImageUploadAllowedExtensions	= ".(jpg|gif|jpeg|png|bmp)$" ;		// empty for all
TDConfig.ImageUploadDeniedExtensions	= "" ;							// empty for no one

TDConfig.FlashUpload = false ;
TDConfig.FlashUploadURL = TDConfig.BasePath + 'filemanager/connectors/' + _QuickUploadLanguage + '/upload.' + _QuickUploadExtension + '?Type=Flash' ;
TDConfig.FlashUploadAllowedExtensions	= ".(swf|flv)$" ;		// empty for all
TDConfig.FlashUploadDeniedExtensions	= "" ;					// empty for no one

TDConfig.SmileyPath	= TDConfig.BasePath + 'images/smiley/msn/' ;
TDConfig.SmileyImages	= ['regular_smile.gif','sad_smile.gif','wink_smile.gif','teeth_smile.gif','confused_smile.gif','tounge_smile.gif','embaressed_smile.gif','omg_smile.gif','whatchutalkingabout_smile.gif','angry_smile.gif','angel_smile.gif','shades_smile.gif','devil_smile.gif','cry_smile.gif','lightbulb.gif','thumbs_down.gif','thumbs_up.gif','heart.gif','broken_heart.gif','kiss.gif','envelope.gif'] ;
TDConfig.SmileyColumns = 8 ;
TDConfig.SmileyWindowWidth		= 320 ;
TDConfig.SmileyWindowHeight	= 240 ;

