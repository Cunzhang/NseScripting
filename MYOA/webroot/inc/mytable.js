var $ = function(id) {return document.getElementById(id);};
function _getElementsByTagName(a)
{
	return document.getElementsByTagName?document.getElementsByTagName(a):new Array()
}

var isSafari=navigator.userAgent.indexOf("Safari")>=0;

function _sendXMLRequest(theURL,aa)
{
	var xmlHttpObj=getXMLHttpObj();
	if(!xmlHttpObj||isSafari&&!aa)
	{
		(new Image()).src=theURL;
	}
	else
	{
		xmlHttpObj.open("GET",theURL,true);
		if(aa)
		{
//			xmlHttpObj.onreadystatechange=function(){if(xmlHttpObj.readyState==4){alert(xmlHttpObj.responseText)}}
		}
		xmlHttpObj.send(null);
	}
}

function getXMLHttpObj()
{
	var a=null;
	if(window.ActiveXObject)
	{
		a=new ActiveXObject("Msxml2.XMLHTTP");
		if(!a)
		{
			a=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else if(window.XMLHttpRequest)
	{
		a=new XMLHttpRequest();
	}
	return a;
}

function _del(a)
{
	msg="确认不显示该模块么?";
  if(window.confirm(msg))
  {
	  var module=$("module_"+a);
	  if(module)
	    module.style.display="none";
	  aI();
	}
}

function setCSSAttrib(clasName,attrName,attrValue)
{
	if(document.styleSheets)
	{
		clasName="."+clasName;
		for(var i=0;i<document.styleSheets.length;i++)
		{
			var classI=document.styleSheets[i];
			var rulesI=classI.rules;
			if(!rulesI)
			{
				rulesI=classI.cssRules;
				if(!rulesI){return}
			}
			for(var j=0;j<rulesI.length;j++)
			{
				if(rulesI[j].selectorText.toLowerCase()==clasName.toLowerCase())
				{
					rulesI[j].style[attrName]=attrValue
				}
			}
		}
	}
	else
	{
		var elementI=_getElementsByTagName("*");
		for(var i=0;i<elementI.length;i++)
		{
			if(elementI[i].className==clasName)
			{
				elementI[i].style[attrName]=attrValue
			}
		}
	}
}


var aC="";

var _pnlo;
var _mod;
var ay=false;

function _upc(cols)
{
//	if(_pl&&(_uli||_pnlo))
	{
		if(!ay)
		{
			if(cols==2)
			   initHead([$("col_l"),$("col_r")]);
			else
			   initHead([$("col_l"),$("col_c"),$("col_r")]);
			ay=true
		}
	}
}

var aq=0;

var colArray=[];
var ap=0;
var am=null;

function createDiv()
{
	if(!am)
	{
		am=document.createElement("DIV");
		am.style.display="none";
		am.style.position="absolute";
		am.style.cursor="move";
		am.style.backgroundColor="#ffffff";
		am.style.paddingBottom="0px";
		document.body.appendChild(am)
	}
	return am
}

var al = {"obj":null,
	"init":function(a){
		a.onmousedown=al.start;
		if ( isNaN(parseInt(createDiv().style.left)) ) {
			createDiv().style.left="0px";
		}
		if ( isNaN(parseInt(createDiv().style.top)) ) {
			createDiv().style.top="0px";
		}
		a.onDragStart=new Function();
		a.onDragEnd=new Function();
		a.onDrag=new Function()
		},
	"start":function(a){
		var aa=al.obj=this;
		a=al.fixE(a);
		var ab=parseInt(createDiv().style.top);
		var ac=parseInt(createDiv().style.left);
		aa.onDragStart(ac,ab,a.clientX,a.clientY);
		aa.lastMouseX=a.clientX;
		aa.lastMouseY=a.clientY;
		document.onmousemove=al.drag;
		document.onmouseup=al.end;
		return false
		},
	"drag":function(a){
		a=al.fixE(a);
		var aa=al.obj;
		var ab=a.clientY;
		var ac=a.clientX;
		var ad=parseInt(createDiv().style.top);
		var ae=parseInt(createDiv().style.left);
		var af,ag;
		af=ae+ac-aa.lastMouseX;
		ag=ad+ab-aa.lastMouseY;
		createDiv().style.left=af+"px";
		createDiv().style.top=ag+"px";
		aa.lastMouseX=ac;
		aa.lastMouseY=ab;
		aa.onDrag(af,ag,a.clientX,a.clientY);
		return false
		},
	"end":function(){
		document.onmousemove=null;
		document.onmouseup=null;
		al.obj.onDragEnd(parseInt(createDiv().style.left),parseInt(createDiv().style.top));
		al.obj=null
		},
	"fixE":function(a){
		if (typeof a=="undefined") {
			a=window.event;
		}
		if (typeof a.layerX=="undefined") {
			a.layerX=a.offsetX;
		}
		if (typeof a.layerY=="undefined") {
			a.layerY=a.offsetY;
		}
		return a
		}
};

var aw=false;

function initHead(a)
{
	if(aw)return;
	aw=true;
	colArray=a;
	for(var i=0;i<colArray.length;i++)
	{
		for(var j=0;j<colArray[i].childNodes.length-1;j++)
		{
			var module_i=colArray[i].childNodes[j];
			var title_i=$(module_i.id+"_title");
			if(!title_i)
				continue;

			title_i.module=module_i;
			al.init(title_i);

			var head_i=$(module_i.id+"_head");
			if(head_i)
			{
			   head_i.module=module_i;
			   head_i.onmouseover=function() {var op_i=$(this.module.id+"_op");if(op_i) op_i.style.display="inline";}
			   head_i.onmouseout =function() {var op_i=$(this.module.id+"_op");if(op_i) op_i.style.display="none";}
			}
			var body_i=$(module_i.id+"_body");
			if(body_i)
			{
			   var ul_i=$(module_i.id+'_ul');
			   if(ul_i.scrollHeight-ul_i.scrollTop>lines_per_page*20)
         {
			      body_i.module=module_i;
			      body_i.onmouseover=function() {var page_i=$(this.module.id+"_page");if(page_i) page_i.style.display="inline";}
			      body_i.onmouseout =function() {var page_i=$(this.module.id+"_page");if(page_i) page_i.style.display="none";}
			   }
			}

			title_i.onDragStart=function(af,ag) {
					clearInterval(ap);
					var module_i=this.module;
					aA(module_i);
					module_i.origNextSibling=module_i.nextSibling;

					var module_i_copy=createDiv();
					module_i_copy.style.left=getOffset(module_i,true);
					module_i_copy.style.top=getOffset(module_i,false);
					module_i_copy.style.height=module_i.offsetHeight;
					module_i_copy.style.width=module_i.offsetWidth;
					module_i_copy.style.display="block";
					module_i_copy.style.opacity=0.8;
					module_i_copy.style.filter="alpha(opacity=80)";
					module_i_copy.innerHTML=module_i.innerHTML;
					module_i_copy.className=module_i.className;
					this.dragged=false
				};

			title_i.onDrag=function(af,ag) {
				setModulePos(this.module,af,ag);
				this.dragged=true
				};

			title_i.onDragEnd=function(af,ag) {
					if (this.dragged) {
						ap=aD(this.module,150,15)
					} else {
						ax();
						if (this.href) {
							if (this.target){
								window.open(this.href,this.target)
							} else {
								document.location=this.href
							}
						}
					}
					this.target=null;
					this.href=null;
					if (this.module.nextSibling!=this.module.origNextSibling) {
						aI()
					}
				}
		}//second for end
	}//first for end
}

function ax()
{
	createDiv().style.display="none"
}

function aD(a,aa,ab)
{
	var ac=parseInt(createDiv().style.left);
	var ad=parseInt(createDiv().style.top);
	var ae=(ac-getOffset(a,true))/ab;
	var af=(ad-getOffset(a,false))/ab;
	return setInterval(function(){if(ab<1){clearInterval(ap);ax();return}ab--;ac-=ae;ad-=af;createDiv().style.left=parseInt(ac)+"px";createDiv().style.top=parseInt(ad)+"px"},aa/ab)
}

function aA(a)
{
	for(var aa=0;aa<colArray.length;aa++)
	{
		var ab=0;
		for(var ac=0;ac<colArray[aa].childNodes.length;ac++)
		{
			var ad=colArray[aa].childNodes[ac];
			if(ad==a)
				ab=ad.offsetHeight;
			ad.pagePosLeft=getOffset(ad,true);
			ad.pagePosTop=getOffset(ad,false)-ab
		}
	}
}

function getOffset(obj,isLeftOffset)
{
	var offsetValue=0;
	while(obj!=null)
	{
		offsetValue+=obj["offset"+(isLeftOffset?"Left":"Top")];
		obj=obj.offsetParent
	}
	return offsetValue
}

function setModulePos(obj,posLeft,posTop)
{
	var module=null;
	var ad=100000000;

	for(var i=0;i<colArray.length;i++)
	{
		for(var j=0;j<colArray[i].childNodes.length;j++)
		{
			var module_i=colArray[i].childNodes[j];
			if(module_i==obj)
				continue;

			var ai=Math.sqrt(Math.pow(posLeft-module_i.pagePosLeft,2)+Math.pow(posTop-module_i.pagePosTop,2));
			if(isNaN(ai))
				continue;
			if(ai<ad)
			{
				ad=ai;module=module_i
			}
		}
	}

	if(module!=null&&obj.nextSibling!=module)
	{
		module.parentNode.insertBefore(obj,module);
	}
}

function aI()
{
	var a="";
	for(var i=0;i<colArray.length;i++)
	{
		a+=a!=""?":":"";
		for(var j=0;j<colArray[i].childNodes.length-1;j++)
		{
			var module=colArray[i].childNodes[j];
			if(module.id=="" || module.style.display=="none")
			   continue;
			a+=module.id.substring(7)+",";
		}
	}
	_sendXMLRequest("/general/person_info/mytable/dragconfig.php?MYTABLE="+escape(a),null)
}

////////////////////////////////////////////////////////////////////////////////////////
function setCookie(name,value) {
   var today = new Date();
   var expires = new Date();
   expires.setTime(today.getTime() + 1000*60*60*24*2000);
   parent.document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString();
}
function checkNum(str)
{
   var re=/\D/;
   return str.match(re);
}

var msgBlockHTML = "";
function show_msg(msgBlock)
{
   msgBlockHTML = $(msgBlock).innerHTML;
   $("overlay").style.display = 'block';
   $(msgBlock).style.display = 'block';

   var bb=(document.compatMode && document.compatMode!="BackCompat") ? document.documentElement : document.body;
   if(document.compatMode && document.compatMode!="BackCompat")
   {
      $("overlay").style.width = bb.scrollWidth;
      $("overlay").style.height = bb.scrollHeight;
   }
   else
   {
      $("overlay").style.width = bb.scrollWidth;
      $("overlay").style.height = bb.scrollHeight;
   }
   $(msgBlock).style.left = (bb.offsetWidth - $(msgBlock).offsetWidth)/2;
   $(msgBlock).style.top  = 100 + bb.scrollTop;
}
function hide_msg(msgBlock)
{
   $(msgBlock).innerHTML = msgBlockHTML;
   $("overlay").style.display = 'none';
   $(msgBlock).style.display = 'none';
}
function NextPage(mdule_id, page)
{
   var o=$('module_'+mdule_id+'_ul');
   if(!o)   return;
   o.scrollTop+=page*lines_per_page*20;
   if(o.scrollTop > 0)
      $('module_'+mdule_id+'_link_pre').className="";
   else
      $('module_'+mdule_id+'_link_pre').className="PageLinkDisable";
   if(o.scrollHeight-o.scrollTop>lines_per_page*20)
      $('module_'+mdule_id+'_link_next').className="";
   else
      $('module_'+mdule_id+'_link_next').className="PageLinkDisable";
}

function CorrectImg()
{
   var imgs=document.getElementsByTagName("IMG");
   for(var i=0; i<imgs.length; i++)
   {
      var el = imgs[i];
      var imgSrc = el.src.toLowerCase();
      var tagName = el.parentElement.tagName.toLowerCase();
      if(tagName!="li" && tagName!="a")
         continue;
      var padding_top=Math.ceil((20-el.height)/2);
      el.style.padding=padding_top+"px 3px";
   }
}

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
if(is_ie)
   window.attachEvent("onload", CorrectImg);
else
   window.addEventListener("load", CorrectImg,false);