
// Gets a element by its Id. Used for shorter coding.
function GetE( elementId )
{
	return document.getElementById( elementId )  ;
}

function ShowE( element, isVisible )
{
	if ( typeof( element ) == 'string' )
		element = GetE( element ) ;
	element.style.display = isVisible ? '' : 'none' ;
}

function SetAttribute( element, attName, attValue )
{
	if ( attValue == null || attValue.length == 0 )
		element.removeAttribute( attName, 0 ) ;			// 0 : Case Insensitive
	else
		element.setAttribute( attName, attValue, 0 ) ;	// 0 : Case Insensitive
}

function GetAttribute( element, attName, valueIfNull )
{
	var oAtt = element.attributes[attName] ;

	if ( oAtt == null || !oAtt.specified )
		return valueIfNull ? valueIfNull : '' ;

	var oValue = element.getAttribute( attName, 2 ) ;

	if ( oValue == null )
		oValue = oAtt.nodeValue ;

	return ( oValue == null ? valueIfNull : oValue ) ;
}

var KeyIdentifierMap = 
{
	End		: 35,
	Home	: 36,
	Left	: 37,
	Right	: 39,
	'U+00007F' : 46		// Delete
} 

// Functions used by text fields to accept numbers only.
function IsDigit( e )
{
	if ( !e )
		e = event ;

	var iCode = ( e.keyCode || e.charCode ) ;
	
	if ( !iCode && e.keyIdentifier && ( e.keyIdentifier in KeyIdentifierMap ) ) 
			iCode = KeyIdentifierMap[ e.keyIdentifier ] ;

	return (
			( iCode >= 48 && iCode <= 57 )		// Numbers
			|| (iCode >= 35 && iCode <= 40)		// Arrows, Home, End
			|| iCode == 8						// Backspace
			|| iCode == 46						// Delete
			|| iCode == 9						// Tab
	) ;
}

String.prototype.Trim = function()
{
	return this.replace( /(^\s*)|(\s*$)/g, '' ) ;
}

String.prototype.StartsWith = function( value )
{
	return ( this.substr( 0, value.length ) == value ) ;
}

String.prototype.Remove = function( start, length )
{
	var s = '' ;

	if ( start > 0 )
		s = this.substring( 0, start ) ;

	if ( start + length < this.length )
		s += this.substring( start + length , this.length ) ;

	return s ;
}

String.prototype.ReplaceAll = function( searchArray, replaceArray )
{
	var replaced = this ;

	for ( var i = 0 ; i < searchArray.length ; i++ )
	{
		replaced = replaced.replace( searchArray[i], replaceArray[i] ) ;
	}

	return replaced ;
}

function OpenFileBrowser( url, width, height )
{
	// oEditor must be defined.

	var iLeft = ( oEditor.TDConfig.ScreenWidth  - width ) / 2 ;
	var iTop  = ( oEditor.TDConfig.ScreenHeight - height ) / 2 ;

	var sOptions = "toolbar=no,status=no,resizable=yes,dependent=yes,scrollbars=yes" ;
	sOptions += ",width=" + width ;
	sOptions += ",height=" + height ;
	sOptions += ",left=" + iLeft ;
	sOptions += ",top=" + iTop ;

	// The "PreserveSessionOnFileBrowser" because the above code could be
	// blocked by popup blockers.
	if ( oEditor.TDConfig.PreserveSessionOnFileBrowser && oEditor.TDBrowserInfo.IsIE )
	{
		// The following change has been made otherwise IE will open the file
		// browser on a different server session (on some cases):
		// http://support.microsoft.com/default.aspx?scid=kb;en-us;831678
		// by Simone Chiaretta.
		var oWindow = oEditor.window.open( url, 'TDBrowseWindow', sOptions ) ;

		if ( oWindow )
		{
			// Detect Yahoo popup blocker.
			try
			{
				var sTest = oWindow.name ; // Yahoo returns "something", but we can't access it, so detect that and avoid strange errors for the user.
				oWindow.opener = window ;
			}
			catch(e)
			{
				alert( oEditor.TDLang.BrowseServerBlocked ) ;
			}
		}
		else
			alert( oEditor.TDLang.BrowseServerBlocked ) ;
    }
    else
		window.open( url, 'TDBrowseWindow', sOptions ) ;
}
