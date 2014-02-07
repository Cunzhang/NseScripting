//--- 图形化设计 ---
var dragapproved = false;
var eventsource,x,y;
var popeventsource = "";
var temp1 = 0;
var temp2 = 0;

function nocontextmenu()
{
 event.cancelBubble = true
 event.returnValue = false;

 return false;
}

//-- 初始化移动参数 --
function nodrags()
{
   dragapproved = false;
}

function move()
{
	if (event.button == 1 && dragapproved)
	{
		var newleft = temp1 + event.clientX - x;
		var newtop = temp2 + event.clientY - y;
		eventsource.style.pixelLeft = newleft;
		eventsource.style.pixelTop = newtop;

		drawLine();

		return false;
	}
}

function drags()
{
  if (event.button != 1)
     return;

	var objRect = event.srcElement;
	if (event.srcElement.tagName.toLowerCase() == 'textbox') objRect = event.srcElement.parentElement;

	if ((objRect.tagName == 'roundrect') && (!event.ctrlKey))
	{
		dragapproved = true;
		eventsource = objRect;
		temp1 = eventsource.style.pixelLeft;
		temp2 = eventsource.style.pixelTop;
		x = event.clientX;
		y = event.clientY;
		document.onmousemove = move;
	}
}

//-- 画线 --
function drawLine()
{
  var source;
  var object;
  var sourceObj;
  var objectObj;
  var x0,y0,x1,y1;
  var p0,p1;
  var a = document.getElementsByTagName('line');
  for (var i = 0; i < a.length; i++)
  {
     source = a[i].getAttribute('source');
     object = a[i].getAttribute('object');
     if ((source != null) && (object != null))
     {
        sourceObj = document.getElementById(source);
        objectObj = document.getElementById(object);

        if ((sourceObj == null) || (objectObj == null)) continue;

        if (sourceObj.style.pixelLeft > objectObj.style.pixelLeft)
        {
           if ((sourceObj.style.pixelLeft - objectObj.style.pixelLeft) <= objectObj.style.pixelWidth)
           {
	  x0 = sourceObj.style.pixelLeft + sourceObj.style.pixelWidth / 2;
	  x1 = objectObj.style.pixelLeft + objectObj.style.pixelWidth / 2;
               if (sourceObj.style.pixelTop >  objectObj.style.pixelTop)
               {
  	  		y0 = sourceObj.style.pixelTop;
  	  		y1 = objectObj.style.pixelTop  + objectObj.style.pixelHeight;
               }
               else
               {
  	  		y0 = sourceObj.style.pixelTop + sourceObj.style.pixelHeight;
  	  		y1 = objectObj.style.pixelTop;
  	  }
           }
           else
           {
               x0 = sourceObj.style.pixelLeft;
               x1 = objectObj.style.pixelLeft + objectObj.style.pixelWidth;
  	  y0 = sourceObj.style.pixelTop + sourceObj.style.pixelHeight / 2;
  	  y1 = objectObj.style.pixelTop + objectObj.style.pixelHeight / 2;
           }
        }
        else
        {
           if ((objectObj.style.pixelLeft - sourceObj.style.pixelLeft) <= objectObj.style.pixelWidth)
           {
	  x0 = sourceObj.style.pixelLeft + sourceObj.style.pixelWidth / 2;
	  x1 = objectObj.style.pixelLeft + objectObj.style.pixelWidth / 2;
               if (sourceObj.style.pixelTop >  objectObj.style.pixelTop)
               {
  	  		y0 = sourceObj.style.pixelTop;
  	  		y1 = objectObj.style.pixelTop  + objectObj.style.pixelHeight;
               }
               else
               {
  	  		y0 = sourceObj.style.pixelTop + sourceObj.style.pixelHeight;
  	  		y1 = objectObj.style.pixelTop;
  	  }
           }
           else
           {
		x0 = sourceObj.style.pixelLeft + sourceObj.style.pixelWidth;
		x1 = objectObj.style.pixelLeft;
		y0 = sourceObj.style.pixelTop + sourceObj.style.pixelHeight / 2;
		y1 = objectObj.style.pixelTop + objectObj.style.pixelHeight / 2;
             }
        }

        a[i].from = String(x0) + ',' + String(y0);
        a[i].to = String(x1) + ',' + String(y1);

        a[i].style.pixelLeft = x0 + 'px';
        a[i].style.pixelTop = y0 + 'px';

        //条件
        strIF = a[i].getAttribute('title');
        if ((strIF != null) && (strIF != ''))
        {
	var id = 'if_' + source + '_' + object;
	var obj = document.getElementById(id);

	var left = (x0 + (x1 - x0) / 2 - 30);
	var top = (y0 + (y1 - y0) / 2 - 15);

	if (obj != null)
	{
		obj.style.pixelLeft = left + 'px';
		obj.style.pixelTop = top + 'px';

		obj.style.left = left + 'px';
		obj.style.top = top + 'px';

		obj.style.display = '';
	}
        }

        a[i].style.display = '';
     }
  }
}

//表单加载完成
function document.onreadystatechange()
{
   if (document.readyState=='complete')
   {
      drawLine();
      document.onmousedown = drags;  //开始移动
      document.onmouseup = nodrags;  //结束移动
   }
}

// 形成菜单行
function getMenuRow(s_Event, s_Html) {
	var s_MenuRow = "";
	s_MenuRow = "<tr><td align=center valign=middle nowrap><TABLE border=0 cellpadding=0 cellspacing=0 width=132><tr><td nowrap valign=middle height=20 class=MouseOut onMouseOver=this.className='MouseOver'; onMouseOut=this.className='MouseOut';";
	s_MenuRow += " onclick=\"parent."+s_Event+";parent.oPopupMenu.hide();\"";
	s_MenuRow += ">&nbsp;";
	s_MenuRow += s_Html+"<\/td><\/tr><\/TABLE><\/td><\/tr>";
	return s_MenuRow;
}


//-- 右键菜单 --
var sMenuHr = "<tr><td align=center valign=middle height=2><TABLE border=0 cellpadding=0 cellspacing=0 width=128 height=2><tr><td height=1 class=HrShadow><\/td><\/tr><tr><td height=1 class=HrHighLight><\/td><\/tr><\/TABLE><\/td><\/tr>";
var sMenu1 = "<TABLE onmousedown='if (event.button==1) return true; else return false;' border=0 cellpadding=0 cellspacing=0 class=Menu width=150><tr><td width=18 valign=bottom align=center style=''><\/td><td width=132 class=RightBg><TABLE border=0 cellpadding=0 cellspacing=0>";
var sMenu2 = "<\/TABLE><\/td><\/tr><\/TABLE>";
var oPopupMenu = null;
oPopupMenu = window.createPopup();

function showContextMenu(event,type)
{
	var style = "";
	style = "BODY {margin:0px;border:0px}";
	style += " TD {font-size:9pt;font-family:宋体,Verdana,Arial}";
	style += " TABLE.Menu {border-top:window 1px solid;border-left:window 1px solid;border-bottom:buttonshadow 1px solid;border-right:buttonshadow 1px solid;background-color:#0072BC}";
	style += "TD.RightBg {background-color:buttonface}";
	style += "TD.MouseOver {background-color:highlight;color:highlighttext;cursor:default;}";
	style += "TD.MouseOut {background-color:buttonface;color:buttontext;cursor:default;}";
	style += "TD.HrShadow {background-color:buttonshadow;}";
	style += "TD.HrHighLight {background-color:buttonhighlight;}";
	style = "<style>" + style + "</style>";

	var width = 150;
	var height = 0;
	var lefter = event.clientX;
	var topper = event.clientY;

	var oPopDocument = oPopupMenu.document;
	var oPopBody = oPopupMenu.document.body;

   //object
	var objRect = event.srcElement;
	if (event.srcElement.tagName.toLowerCase() == 'textbox')
	    objRect = event.srcElement.parentElement;

	var Process_ID =  objRect.getAttribute('table_id');

	var sMenu = style;

  switch(type)
  {
  case 1:

  	sMenu += getMenuRow("Edit_Process("+Process_ID+")", "步骤基本属性");
  	height += 20;

  	sMenu += getMenuRow("set_item("+Process_ID+")", "可写字段");
  	height += 20;

  	sMenu += getMenuRow("set_user("+Process_ID+")", "经办人员");
  	height += 20;

  	sMenu += getMenuRow("set_dept("+Process_ID+")", "经办部门");
  	height += 20;

  	sMenu += getMenuRow("set_priv("+Process_ID+")", "经办角色");
  	height += 20;

  	sMenu += sMenuHr;
  	height += 2;

  	sMenu += getMenuRow("Del_Process("+Process_ID+")", "删除该步骤");
  	height += 20;

  	break;

  case 2:

  	sMenu += getMenuRow("Add_Process()", "新建步骤");
  	height += 20;

  	sMenu += sMenuHr;
  	height += 2;

  	sMenu += getMenuRow("SavePosition()", "保存布局");
  	height += 20;

  	sMenu += getMenuRow("Refresh()", "刷新视图");
  	height += 20;

  	break;
/*
  case 3:
    var fid =  objRect.getAttribute('mfrID');
		sMenu += getMenuRow("DelFlowRun(" + fid + ")",  "删除连线");
	  height += 20;
	  break;
*/
  }

	sMenu = sMenu1 + sMenu + sMenu2;

	height += 2;
	if (lefter+width > document.body.clientWidth) lefter = lefter - width + 2;
	if (topper+height > document.body.clientHeight) topper = topper - height + 2;

	oPopupMenu.document.body.innerHTML = sMenu;
	oPopupMenu.show(lefter, topper, width, height,document.body);

	return false;
}

//-- 鼠标右击 --
function DoRightClick()
{
	pub_x = event.clientX;
	pub_y = event.clientY;

  SetSel();
}


//-- 选择步骤 --
function SetSel()
{
   var flowType = '';
   var flowID = 0;
   var passCount = 0;
   var flowColor = '';
   var strStart="#00EE00";
   var strEnd="#F4A8BD";
   var strOut="#EEEEEE";
   var strSelect ="#8E83F5";

   var vml = document.getElementsByTagName('roundrect');
   for (var i = 0; i < vml.length; i++)
   {
      flowType = vml[i].getAttribute('flowType');
      if (flowType == 'start')
      {
         flowColor = strStart;
      }
      else if (flowType == 'end')
      {
         flowColor = strEnd;
      }
      else
      {
         flowColor = strOut;
      }
      vml[i].fillcolor = flowColor;
   }

   var objRect = event.srcElement;
   if(event.srcElement.tagName.toLowerCase() == 'textbox')
      objRect = event.srcElement.parentElement;

   //步骤类型
   //flowType = objRect.getAttribute('flowType');
   try { if (objRect.tagName == 'roundrect') objRect.fillcolor = strSelect; } catch(e){}
}


//-- 删除流程线 --
function SetSqlDelFlow(fid)
{
   var strSql = '';
   strSql = "delete from office_missive_flow_run where office_missive_flow_run_id='" + fid + "' ";
   document.all('tbSQL').value += strSql;
}

//-- 保存布局 --
function SavePosition()
{
   var id = 0;
   var strSql = '';
   var mf_pixel_left = 0;
   var mf_pixel_top = 0;

   a = document.getElementsByTagName('roundrect');
   for (var i = 0; i < a.length; i++)
   {
      table_id = eval(a[i].getAttribute('table_id'));
      mf_pixel_left = a[i].style.pixelLeft;
      mf_pixel_top = a[i].style.pixelTop;

      if (table_id > 0)
      {
         strSql += "SET_LEFT=" + mf_pixel_left + ",SET_TOP=" + mf_pixel_top + " where ID="+table_id+";";
      }
   }

   document.form1.SET_SQL.value += strSql;
   document.form1.submit();
}

//-- 删除流程线 --
function DelFlowRun(fid)
{
   if ((fid == null) || (fid == 0)) return;

   SavePosition();
   SetSqlDelFlow(fid);

   document.all('btnSave').click();
}

//-- 刷新 --
function Refresh()
{
   location.href = location.href;
}

function LoadWindow(URL)
{
  loc_x=(screen.availWidth-600)/2;
  loc_y=(screen.availHeight-500)/2;
  URL+="&GRAPH=1";
  window.open(URL,"set_process","height=500,width=600,status=1,toolbar=no,menubar=no,location=no,scrollbars=yes,top="+loc_y+",left="+loc_x+",resizable=yes");
}

//新建步骤
function Add_Process()
{
   LoadWindow("../view_list/edit.php?FLOW_ID="+flow_id);
}

//编辑步骤属性
function Edit_Process(Process_ID)
{
	LoadWindow("../view_list/edit.php?FLOW_ID="+flow_id+"&ID="+Process_ID);
}

function set_item(Process_ID)
{
	LoadWindow("../view_list/set_item.php?FLOW_ID="+flow_id+"&ID="+Process_ID);
}

function set_user(Process_ID)
{
	LoadWindow("../view_list/set_user.php?FLOW_ID="+flow_id+"&ID="+Process_ID);
}

function set_dept(Process_ID)
{
	LoadWindow("../view_list/set_dept.php?FLOW_ID="+flow_id+"&ID="+Process_ID);
}

function set_priv(Process_ID)
{
	LoadWindow("../view_list/set_priv.php?FLOW_ID="+flow_id+"&ID="+Process_ID);
}

//删除步骤
function Del_Process(Process_ID)
{
	 msg='确认要删除该步骤么？';
   if(window.confirm(msg))
      window.location="../view_list/delete.php?GRAPH=1&FLOW_ID="+flow_id+"&ID="+Process_ID;
}
