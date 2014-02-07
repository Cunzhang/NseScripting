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
			   body_i.module=module_i;
			   body_i.onmouseover=function() {var page_i=$(this.module.id+"_page");if(page_i) page_i.style.display="inline";}
			   body_i.onmouseout =function() {var page_i=$(this.module.id+"_page");if(page_i) page_i.style.display="none";}
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
	_sendXMLRequest("/general/person_info/mytable/dragconfig.php?MY_RSS="+escape(a),null)
}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
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

function SetNums()
{
   var today_lines=$('display_lines').value;
   var today_time_out=$('time_out').value;
   if(today_lines=="" || today_time_out=="")
   {
      alert("请输入数值");
      return;
   }
   if(checkNum(today_lines) || checkNum(today_time_out))
   {
      alert("显示条数和连接超时必须是数字");
      return;
   }

   if(parseInt(today_lines)<=0 || parseInt(today_lines)>=1000)
   {
      alert("显示封数必须在1-1000之间");
      return;
   }
   setCookie("today_lines"+uid, today_lines);
   setCookie("today_timeout"+uid, today_time_out);
   lines_per_page=today_lines;
   time_out=today_time_out;
   $("msgBody").style.display = "none";
   $("msgCommand").style.display = "none";
   $("msgSuccess").style.display = "block";

   var ul=_getElementsByTagName("UL");
   for(i=0; i<ul.length; i++)
   {
      if(ul[i].id.substr(0,7)=="module_" && ul[i].id.substr(ul[i].id.length-3,3)=="_ul")
         ul[i].style.height=lines_per_page*20;
   }
}
function init_lines()
{
   $('display_lines').value=lines_per_page;
   $('time_out').value=time_out;
   $('display_lines').focus();
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

var cur_content="0";
function view_content(id)
{
   $("rss_content_"+cur_content).style.display='none';
   $("rss_content_"+id).style.display='';
   $("content_link_"+cur_content).className='';
   $("content_link_"+id).className='current';
   cur_content=id;
}
function add_rss()
{
   var req=getXMLHttpObj();
	req.open("GET","/general/person_info/url/rss_module.php",true);
	req.onreadystatechange=function()
	{
	   if(req.readyState==4)
         $("addRssBody").innerHTML=req.responseText;
   };
   req.send(null);
   show_msg('addRssBlock');
}
function add_module(url_id,url,url_desc)
{
   if($("module_"+url_id))
   {
      $("module_"+url_id).style.display='block';
      alert("该模块已存在")
      return;
   }

   var col=$("col_r").childNodes.length < $("col_l").childNodes.length ? $("col_r") : $("col_l");
   for(var j=0;j<col.childNodes.length;j++)
	{
		if(col.childNodes[j].className=="shadow")
		   col.removeChild(col.childNodes[j]);
	}

   var module=document.createElement("DIV");
   module.id="module_"+url_id;
   module.className="module";
   col.appendChild(module);
   module.innerHTML="  <h4 id='module_"+url_id+"_head' class='moduleHeader'>    <span id='module_"+url_id+"_title' class='title' style='cursor:move;'>"+url_desc+"</span>    <a id='module_"+url_id+"_op' class='close' href='#' onclick=\"_del('"+url_id+"');\"><img src='/images/close.png'></a>  </h4>  <div id='module_"+url_id+"_body' class='module_body'>    <ul id='module_"+url_id+"_ul' style='height:"+(lines_per_page*20)+"px'>    </ul>    <span id='module_"+url_id+"_page' class='module_page'>      <a href=\"javascript:NextPage('"+url_id+"',-1);\" id='module_"+url_id+"_link_pre' class='PageLinkDisable'><上一页</a>      <a href=\"javascript:NextPage('"+url_id+"',1);\"  id='module_"+url_id+"_link_next'>下一页></a>      <a href=\"javascript:getNews('"+url_id+"','"+url+"',0);\">刷新</a>    </span>  </div>";
   getNews(url_id,url,0);

   var shadow=document.createElement("DIV")
   shadow.className="shadow";
   col.appendChild(shadow);

   ay=aw=false;
   _upc(2);
   aI();
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

var _st = window.setTimeout;
window.setTimeout = function(fRef, mDelay)
{
   if(typeof fRef == 'function')
   {
     var argu = Array.prototype.slice.call(arguments,2);
     var f = (function(){ fRef.apply(null, argu); });
     return _st(f, mDelay);
   }
   return _st(fRef,mDelay);
}

function getNews(module_id,rssURL,rows)
{
	var timeoutID, theURL="/inc/RSS/news.php?URL_ID="+module_id+"&ROWS="+rows+"&RSSURL="+rssURL;
   var req=getXMLHttpObj();
	req.open("GET",theURL,true);
	req.onreadystatechange=function()
	{
		var module_ul=$("module_"+module_id+"_ul");
		if(req.readyState==4)
		{
			if(module_ul)
			{
			   module_ul.innerHTML=req.responseText;
			   var lines=req.responseText.split("</li>");
			   if(lines.length<=lines_per_page)
			      $("module_"+module_id+"_link_next").className="PageLinkDisable";
			}
			window.clearTimeout(timeoutID);
		}
		else
		   if(module_ul) module_ul.innerHTML="<img src='/images/loading.gif' height='20' width='20' align='absMiddle'> 加载中，请稍候……";
	};

	req.send(null);
	timeoutID=window.setTimeout(abortRequest, time_out*1000, req,module_id);
}
function abortRequest(req,module_id)
{
   if(req)
   {
      req.abort();
      req=null;
   }
   var module_ul=$("module_"+module_id+"_ul");
   if(module_ul) module_ul.innerHTML="操作超时";
}
function GetWeather(HOURS)
{
   var WEATHER_CITY_ID=$('chinacity').value;
   var WEATHER_CITY = $('chinacity').options[$('chinacity').selectedIndex].text;
   if(WEATHER_CITY == "选择城市" || WEATHER_CITY == "0")
   {
      alert("请选择城市");
      return;
   }

   $('weather').innerHTML="<img src='/images/loading.gif' height='20' width='20' align='absMiddle'> 加载中，请稍候……";
   var httpReq=getXMLHttpObj();
   httpReq.open("GET","/inc/weather.php?WEATHER_CITY="+WEATHER_CITY+"&WEATHER_CITY_ID="+WEATHER_CITY_ID+"&VIEW=BIG&HOURS="+HOURS,true);
   httpReq.onreadystatechange=function(){
      if(httpReq.readyState==4){
         if(httpReq.responseText=="error")
            $('weather').innerHTML="获取天气信息错误 <a href=\"javascript:SetCity('"+WEATHER_CITY_ID+"');\">刷新</a> <a href=\"#\" onclick=\"$('area_select').style.display='block';$('weather').style.display='none';\">更改城市</a>";
         else
            $('weather').innerHTML=httpReq.responseText;
      }
   };
   httpReq.send(null);
}
function my_radio(ID)
{
  mytop=screen.availHeight-160;
  myleft=screen.availWidth-420;;
  URL="mytable/intel_view/my_radio.php?ID="+ID;
  window.open(URL,"my_radio","height=120,width=400,right=0,top="+mytop+",left="+myleft+",status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes");
}