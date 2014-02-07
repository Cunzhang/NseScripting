var TANGER_OCX_bDocOpen = false;
var TANGER_OCX_strOp;
var TANGER_OCX_filename;
var TANGER_OCX_attachName;
var TANGER_OCX_attachURL; //for use with OpenFromURL
var TANGER_OCX_actionURL; //For auto generate form fiields
var TANGER_OCX_OBJ; //The Control
var TANGER_OCX_user; //登录用户

//以下为V1.7新增函数示例

//从本地增加图片到文档指定位置
function AddPictureFromLocal()
{
	if(TANGER_OCX_bDocOpen)
	{
    TANGER_OCX_OBJ.AddPicFromLocal(
	"", //路径
	true,//是否提示选择文件
	true,//是否浮动图片
	100,//如果是浮动图片，相对于左边的Left 单位磅
	100); //如果是浮动图片，相对于当前段落Top
	};
}

//从URL增加图片到文档指定位置
function AddPictureFromURL(URL)
{
	if(TANGER_OCX_bDocOpen)
	{
    TANGER_OCX_OBJ.AddPicFromURL(
	URL,//URL 注意；URL必须返回Word支持的图片类型。
	true,//是否浮动图片
	150,//如果是浮动图片，相对于左边的Left 单位磅
	150);//如果是浮动图片，相对于当前段落Top
	};
}

//从本地增加印章文档指定位置
function AddSignFromLocal(key)
{
   if(TANGER_OCX_bDocOpen)
   {
      TANGER_OCX_OBJ.AddSignFromLocal(
	TANGER_OCX_user,//当前登陆用户
	"",//缺省文件
	true,//提示选择
	0,//left
	0,//top
	key)
   }
}

//从URL增加印章文档指定位置
function AddSignFromURL(key)
{
   var URL,ym,attachment_id,attach_dir;
   attach_dir=document.all("ATTACH_DIR").value;
   if(document.all("DISK_ID").value=="")
   {
      ym=attach_dir.substr(0,attach_dir.indexOf("_"));
      attachment_id=attach_dir.substr(attach_dir.indexOf("_")+1);
   }

   if(document.all("DISK_ID").value=="")
      URL = "/inc/attach.php?MODULE=file_folder&YM="+ym+"&ATTACHMENT_ID="+attachment_id+"&ATTACHMENT_NAME="+document.all("ATTACH_NAME").value;
   else
      URL = "/inc/netdisk.php?DISK_ID="+document.all("DISK_ID").value+"&FILE_NAME="+document.all("ATTACH_DIR").value+"/"+document.all("ATTACH_NAME").value;
   if(TANGER_OCX_bDocOpen)
   {
      TANGER_OCX_OBJ.AddSignFromURL(
	TANGER_OCX_user,//当前登陆用户
	URL,//URL
	50,//left
	50, //top
	key)
   }
}

//开始手写签名
function DoHandSign(key)
{
   if(TANGER_OCX_bDocOpen)
   {
	TANGER_OCX_OBJ.DoHandSign(
	TANGER_OCX_user,//当前登陆用户 必须
	0,//笔型0－实线 0－4 //可选参数
	0x000000ff, //颜色 0x00RRGGBB//可选参数
	2,//笔宽//可选参数
	100,//left//可选参数
	50, //top//可选参数
	null,
	key);
   }
}

//开始全屏手写签名
function DoHandSign2(key)
{
   if(TANGER_OCX_bDocOpen)
   {
	TANGER_OCX_OBJ.DoHandSign2(
	TANGER_OCX_user,//当前登陆用户 必须
	key, //SignKey
	0,//left//可选参数
	0,//top
	0,//relative=0，表示按照屏幕位置批注
	100 //缩放100%，表示原大小
        );
   }
}

//开始手工绘图，可用于手工批示
function DoHandDraw()
{
	if(TANGER_OCX_bDocOpen)
	{
	TANGER_OCX_OBJ.DoHandDraw(
	0,//笔型0－实线 0－4 //可选参数
	0x00ff0000,//颜色 0x00RRGGBB//可选参数
	3,//笔宽//可选参数
	200,//left//可选参数
	50//top//可选参数
	);
	}
}

//开始全屏手工绘图，可用于手工批示
function DoHandDraw2()
{
	if(TANGER_OCX_bDocOpen)
	{
	TANGER_OCX_OBJ.DoHandDraw2();
	}
}

//检查签名结果
function DoCheckSign(key)
{
	if(TANGER_OCX_bDocOpen)
	{
	   var ret = TANGER_OCX_OBJ.DoCheckSign(false,key);

	   //可选参数 IsSilent 缺省为FAlSE，表示弹出验证对话框,否则，只是返回验证结果到返回值
	}
}
//以下为以前版本的函数和实用函数
//此函数用来加入一个自定义的文件头部
function TANGER_OCX_AddDocHeader(URL)
{
	try{
		//选择对象当前文档的所有内容
		var curSel = TANGER_OCX_OBJ.ActiveDocument.Application.Selection;
		TANGER_OCX_SetMarkModify(false);
		curSel.WholeStory();
		curSel.Cut();
		//插入模板
		TANGER_OCX_OBJ.AddTemplateFromURL(URL);
		var BookMarkName = "zhengwen";
		if(!TANGER_OCX_OBJ.ActiveDocument.BookMarks.Exists(BookMarkName))
		{
			alert("Word 模板中不存在名称为：\""+BookMarkName+"\"的书签！");
			return;
	  }
		var bkmkObj = TANGER_OCX_OBJ.ActiveDocument.BookMarks(BookMarkName);
		var saverange = bkmkObj.Range
		saverange.Paste();
		TANGER_OCX_OBJ.ActiveDocument.Bookmarks.Add(BookMarkName,saverange);
		TANGER_OCX_SetMarkModify(true);
	}
	catch(err)
	{
	  alert("错误：" + err.number + ":" + err.description);
	}
}

//如果原先的表单定义了OnSubmit事件，保存文档时首先会调用原先的事件。
function TANGER_OCX_doFormOnSubmit()
{
	var form = document.forms[0];
  	if (form.onsubmit)
	{
    	var retVal = form.onsubmit();
     	if (typeof retVal == "boolean" && retVal == false)
       	return false;
	}
	return true;
}

/*此函数在较低版本的IE浏览器中，用来代替
//Javascript的escape函数。
function TANGER_OCX_encodeObjValue(value)
{
	var t;
	t = value.replace(/%/g,"%25");
	return(t.replace(/&/g,"%26"));
}
*/
//此函数用来产生自动将表单数据创建成为
//控件的SaveToURL函数所需要的参数。返回
//一个paraObj对象。paraObj.FFN包含表单的
//最后一个<input type=file name=XXX>的name
//paraObj.PARA包含了表单的其它数据，比如：
//f1=v1&f2=v2&f3=v3.其中,v1.v2.v3是经过
//Javascript的escape函数编码的数据。如果IE
//的版本较低，可以使用上面注释掉的TANGER_OCX_encodeObjValue
//函数代替下面的escape函数。
function TANGER_OCX_genDominoPara(paraObj)
{
	var fmElements = document.forms[0].elements;
	var i,j,elObj,optionItem;
	for (i=0;i< fmElements.length;i++ )
	{
		elObj = fmElements[i];
		switch(elObj.type)
		{
			case "file":
				paraObj.FFN = elObj.name;
				break;
			case "reset":
				break;
			case "radio":
			case "checkbox":
				if (elObj.checked)
				{
					paraObj.PARA += ( elObj.name+"="+escape(elObj.value)+"&");
				}
				break;
			case "select-multiple":
				for(j=0;j<elObj.options.length;j++)
				{
					optionItem = elObj.options[j];
					if (optionItem.selected)
					{
						paraObj.PARA += ( elObj.name+"="+escape(optionItem.value)+"&");
					}
				}
				break;
			default: // text,Areatext,selecte-one,password,submit,etc.
				if(elObj.name)
				{
					paraObj.PARA += ( elObj.name+"="+escape(elObj.value)+"&");
				}
				break;
		}
	}
}

//设置文档为只读
function TANGER_OCX_SetReadOnly(boolvalue)
{
	var appName,i;
	try
	{
		if (boolvalue) TANGER_OCX_OBJ.IsShowToolMenu = false;

	  if(!TANGER_OCX_bDocOpen)
		   return;

		with(TANGER_OCX_OBJ.ActiveDocument)
		{
			appName = new String(Application.Name);
			if( (appName.toUpperCase()).indexOf("WORD") > -1 ) //Word
			{
				if (ProtectionType != -1 &&  !boolvalue)
				{
					Unprotect();
				}
				if (ProtectionType == -1 &&  boolvalue)
				{
					Protect(2,true,"");
				}
			}
			else if ( (appName.toUpperCase()).indexOf("EXCEL") > -1 ) //EXCEL
			{
				for(i=1;i<=Application.Sheets.Count;i++)
				{
					if(boolvalue)
					{
						Application.Sheets(i).Protect("",true,true,true);
					}
					else
					{
						Application.Sheets(i).Unprotect("");
					}
				}
				if(boolvalue)
				{
					Application.ActiveWorkbook.Protect("",true);
				}
				else
				{
					Application.ActiveWorkbook.Unprotect("");
				}
			}
			else
			{
			}
		}
	}
	catch(err){
		//alert("错误：" + err.number + ":" + err.description);
	}
	finally{
	}
}

//允许或禁止用户从控件拷贝数据
function TANGER_OCX_SetNoCopy(boolvalue)
{
	TANGER_OCX_OBJ.IsNoCopy = boolvalue;
}

//允许或禁止文件－>新建菜单
function TANGER_OCX_EnableFileNewMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(0) = boolvalue;
}
//允许或禁止文件－>打开菜单
function TANGER_OCX_EnableFileOpenMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(1) = boolvalue;
}
//允许或禁止文件－>保存菜单
function TANGER_OCX_EnableFileSaveMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(3) = boolvalue;
}
//允许或禁止文件－>另存为菜单
function TANGER_OCX_EnableFileSaveAsMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(4) = boolvalue;
}
//允许或禁止文件－>打印菜单
function TANGER_OCX_EnableFilePrintMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(5) = boolvalue;
}
//允许或禁止文件－>打印预览菜单
function TANGER_OCX_EnableFilePrintPreviewMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(6) = boolvalue;
}

//允许或禁止显示修订工具栏和工具菜单（保护修订）
function TANGER_OCX_EnableReviewBar(boolvalue)
{

	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.CommandBars("Reviewing").Enabled = boolvalue;
	TANGER_OCX_OBJ.ActiveDocument.CommandBars("Track Changes").Enabled = boolvalue;
	TANGER_OCX_OBJ.IsShowToolMenu = boolvalue;	//关闭或打开工具菜单
}

//打开或者关闭修订模式
function TANGER_OCX_SetReviewMode(boolvalue)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.TrackRevisions = boolvalue;
}

//进入或退出痕迹保留状态，调用上面的两个函数
function TANGER_OCX_SetMarkModify(boolvalue)
{
	TANGER_OCX_SetReviewMode(boolvalue);
}

//显示/不显示修订文字
function TANGER_OCX_ShowRevisions(boolvalue)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.ShowRevisions = boolvalue;
}

//打印/不打印修订文字
function TANGER_OCX_PrintRevisions(boolvalue)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.PrintRevisions = boolvalue;
}

//设置用户名
function TANGER_OCX_SetDocUser(cuser)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	with(TANGER_OCX_OBJ.ActiveDocument.Application)
	{
		UserName = cuser;
	}
}

//设置页面布局
function TANGER_OCX_ChgLayout()
{
 	try
	{
		TANGER_OCX_OBJ.showdialog(5); //设置页面布局
	}
	catch(err){
		alert("错误：" + err.number + ":" + err.description);
	}
	finally{
	}
}

//打印文档
function TANGER_OCX_PrintDoc()
{
	try
	{
		TANGER_OCX_OBJ.printout(true);
	}
	catch(err){
		alert("错误：" + err.number + ":" + err.description);
	}
	finally{
	}
}
//此函数在网页装载时被调用。用来获取控件对象并保存到TANGER_OCX_OBJ
//同时，可以设置初始的菜单状况，打开初始文档等等。
function TANGER_OCX_SetInfo()
{
	var info;
	TANGER_OCX_OBJ = document.all.item("TANGER_OCX");
	var useUTF8 = (document.charset == "utf-8");
	TANGER_OCX_OBJ.IsUseUTF8Data = useUTF8;
	TANGER_OCX_OBJ.FileNew = false;
	TANGER_OCX_OBJ.FileClose = false;
	TANGER_OCX_EnableFileNewMenu(false);
	TANGER_OCX_EnableFileOpenMenu(false);
	TANGER_OCX_EnableFileSaveMenu(false);
	TANGER_OCX_EnableFileSaveAsMenu(false);
	try
	{
		TANGER_OCX_actionURL = document.forms[0].action;
		TANGER_OCX_strOp = document.all.item("TANGER_OCX_op").innerHTML;
		TANGER_OCX_filename = document.all.item("TANGER_OCX_filename").innerHTML;
		TANGER_OCX_attachName = document.all.item("TANGER_OCX_attachName").innerHTML;
		TANGER_OCX_attachURL = document.all.item("TANGER_OCX_attachURL").innerHTML;
		TANGER_OCX_user = document.all.item("TANGER_OCX_user").innerHTML;

		re=/&amp;/g;
    TANGER_OCX_attachURL=TANGER_OCX_attachURL.replace(re,"&");

		if (TANGER_OCX_OBJ.IsHiddenOpenURL)
		{
			TANGER_OCX_attachURL = TANGER_OCX_HiddenURL(TANGER_OCX_attachURL);
		}

		switch(TANGER_OCX_strOp)
		{
			case "1":
				info = "新Word文档";
				TANGER_OCX_OBJ.CreateNew("Word.Document");
				break;
			case "2":
				info = "新Excel工作表";
				TANGER_OCX_OBJ.CreateNew("Excel.Sheet");
				break;
			case "3":
				info = "新PowserPoint幻灯片";
				TANGER_OCX_OBJ.CreateNew("PowerPoint.Show");
				break;
			case "4":
				info = "编辑文档";
				if(TANGER_OCX_attachURL)
				{
					TANGER_OCX_OBJ.BeginOpenFromURL(TANGER_OCX_attachURL,true,false);
				}
				else
				{
					TANGER_OCX_OBJ.CreateNew("Word.Document");
				}
				break;
			case "5":
				info = "阅读文档";
				if(TANGER_OCX_attachURL)
				{
					TANGER_OCX_OBJ.BeginOpenFromURL(TANGER_OCX_attachURL,true,true);
				}
				break;
			default:
				info = "未知操作";
		}

	}
	catch(err){
		//alert("错误：" + err.number + ":" + err.description);
		msg='不能使用微软Office软件打开文档！\n\n是否尝试使用金山WPS文字处理软件打开文档？';
    if(window.confirm(msg))
    {
		   if(TANGER_OCX_strOp==4)
		     TANGER_OCX_OBJ.BeginOpenFromURL(TANGER_OCX_attachURL,true,false,"WPS.Document");
		   else
		   	 TANGER_OCX_OBJ.BeginOpenFromURL(TANGER_OCX_attachURL,true,true,"WPS.Document");
		}
	}
	finally{
	}
}
//此函数在文档关闭时被调用。
function TANGER_OCX_OnDocumentClosed()
{
	TANGER_OCX_bDocOpen = false;
}
//此函数用来保存当前文档。主要使用了控件的SaveToURL函数。
//有关此函数的详细用法，请参阅编程手册。
function TANGER_OCX_SaveDoc(op_flag)
{
	var retStr=new String;
	var newwin,newdoc;
	var paraObj = new Object();
	paraObj.PARA="";
	paraObj.FFN ="";
	try
	{
	 	if(!TANGER_OCX_doFormOnSubmit())return;
		TANGER_OCX_genDominoPara(paraObj);
		if(!paraObj.FFN)
		{
			alert("参数错误：控件的第二个参数没有指定。");
			return;
		}
		if(!TANGER_OCX_bDocOpen)
		{
			alert("没有打开的文档。");
			return;
		}
		switch(TANGER_OCX_strOp)
		{
			case "1":
			  retStr = TANGER_OCX_OBJ.SaveToURL(TANGER_OCX_actionURL,paraObj.FFN,"",TANGER_OCX_filename,0);
			  document.all("ATTACHMENT_ID").value=retStr;
			  if(op_flag==1)
				{
			           TANGER_OCX_bDocOpen = false;
			           window.close();
			  }
			  break;
			case "2":
			   retStr = TANGER_OCX_OBJ.SaveToURL(TANGER_OCX_actionURL,paraObj.FFN,"",TANGER_OCX_filename,0);
			  document.all("ATTACHMENT_ID").value=retStr;
			  if(op_flag==1)
				{
			           TANGER_OCX_bDocOpen = false;
			           window.close();
			  }
			  break;
			case "3":
			  retStr = TANGER_OCX_OBJ.SaveToURL(TANGER_OCX_actionURL,paraObj.FFN,"",TANGER_OCX_filename,0);
			  document.all("ATTACHMENT_ID").value=retStr;
			  if(op_flag==1)
				{
			           TANGER_OCX_bDocOpen = false;
			           window.close();
			  }
			  break;
			case "4":
				lock_ref();
				retStr = TANGER_OCX_OBJ.SaveToURL(TANGER_OCX_actionURL,paraObj.FFN,"",TANGER_OCX_filename,0);
				window.alert(retStr);
				if(op_flag==1)
				{
			           TANGER_OCX_bDocOpen = false;
			           window.close();
			  }
				break;
			case "5":
				alert("文档处于阅读状态，您不能保存到服务器。");
			default:
				break;
		}
	}
	catch(err){
		alert("不能保存到URL：" + err.number + ":" + err.description);
	}
	finally{
	}
}

//此函数在文档打开时被调用。
function TANGER_OCX_OnDocumentOpened(str, obj)
{
	var s, s2;
	try
	{
		TANGER_OCX_bDocOpen = true;
		if( 0==str.length)
		{
			str = TANGER_OCX_filename;
		}
		TANGER_OCX_OBJ.Caption = TANGER_OCX_filename;
		if(TANGER_OCX_filename.indexOf(".ppt")<0 && TANGER_OCX_filename.indexOf(".PPT")<0 )
		   TANGER_OCX_SetDocUser(TANGER_OCX_user);
		s = "未知应用程序";
		if(obj)
		{
			switch(TANGER_OCX_strOp)
			{
				case "1":
				case "2":
				case "3":
				case "4":
					TANGER_OCX_SetReadOnly(false);
					break;
				case "5":
					//TANGER_OCX_OBJ.IsStrictNoCopy=-1;
          //TANGER_OCX_OBJ.ActiveDocument.Protect(1,true,"");
          TANGER_OCX_SetReadOnly(true);

          if(TANGER_OCX_filename.indexOf(".xls")>0 ||TANGER_OCX_filename.indexOf(".XLS")>0 )
          {
          	var sheets = TANGER_OCX_OBJ.ActiveDocument.Sheets;
            var sc = sheets.Count;
            for(var i=1;i<=sc;i++)
            {
              sheets(i).EnableSelection = 1;
            }
          }

					break;
				default:
					break;
			}
			s = obj.Application.Name;
		}
	}
	catch(err){
		window.status = "OnDocumentOpened事件的Script产生错误。" + err.number + ":" + err.description;
	}
	finally{
	}
}

function TANGER_OCX_OnSignSelect(issign,signinfo)
{
   if(!issign)
      return;

   if(signinfo.indexOf("用户:"+TANGER_OCX_user) == -1)
   {
   	  TANGER_OCX_SetReadOnly(true);
      TANGER_OCX_SetReadOnly(false);
   }
}