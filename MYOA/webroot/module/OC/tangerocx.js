var TANGER_OCX_bDocOpen = false;
var TANGER_OCX_strOp;
var TANGER_OCX_filename;
var TANGER_OCX_attachName;
var TANGER_OCX_attachURL; //for use with OpenFromURL
var TANGER_OCX_actionURL; //For auto generate form fiields
var TANGER_OCX_OBJ; //The Control
var TANGER_OCX_user; //��¼�û�

//����ΪV1.7��������ʾ��

//�ӱ�������ͼƬ���ĵ�ָ��λ��
function AddPictureFromLocal()
{
	if(TANGER_OCX_bDocOpen)
	{
    TANGER_OCX_OBJ.AddPicFromLocal(
	"", //·��
	true,//�Ƿ���ʾѡ���ļ�
	true,//�Ƿ񸡶�ͼƬ
	100,//����Ǹ���ͼƬ���������ߵ�Left ��λ��
	100); //����Ǹ���ͼƬ������ڵ�ǰ����Top
	};
}

//��URL����ͼƬ���ĵ�ָ��λ��
function AddPictureFromURL(URL)
{
	if(TANGER_OCX_bDocOpen)
	{
    TANGER_OCX_OBJ.AddPicFromURL(
	URL,//URL ע�⣻URL���뷵��Word֧�ֵ�ͼƬ���͡�
	true,//�Ƿ񸡶�ͼƬ
	150,//����Ǹ���ͼƬ���������ߵ�Left ��λ��
	150);//����Ǹ���ͼƬ������ڵ�ǰ����Top
	};
}

//�ӱ�������ӡ���ĵ�ָ��λ��
function AddSignFromLocal(key)
{
   if(TANGER_OCX_bDocOpen)
   {
      TANGER_OCX_OBJ.AddSignFromLocal(
	TANGER_OCX_user,//��ǰ��½�û�
	"",//ȱʡ�ļ�
	true,//��ʾѡ��
	0,//left
	0,//top
	key)
   }
}

//��URL����ӡ���ĵ�ָ��λ��
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
	TANGER_OCX_user,//��ǰ��½�û�
	URL,//URL
	50,//left
	50, //top
	key)
   }
}

//��ʼ��дǩ��
function DoHandSign(key)
{
   if(TANGER_OCX_bDocOpen)
   {
	TANGER_OCX_OBJ.DoHandSign(
	TANGER_OCX_user,//��ǰ��½�û� ����
	0,//����0��ʵ�� 0��4 //��ѡ����
	0x000000ff, //��ɫ 0x00RRGGBB//��ѡ����
	2,//�ʿ�//��ѡ����
	100,//left//��ѡ����
	50, //top//��ѡ����
	null,
	key);
   }
}

//��ʼȫ����дǩ��
function DoHandSign2(key)
{
   if(TANGER_OCX_bDocOpen)
   {
	TANGER_OCX_OBJ.DoHandSign2(
	TANGER_OCX_user,//��ǰ��½�û� ����
	key, //SignKey
	0,//left//��ѡ����
	0,//top
	0,//relative=0����ʾ������Ļλ����ע
	100 //����100%����ʾԭ��С
        );
   }
}

//��ʼ�ֹ���ͼ���������ֹ���ʾ
function DoHandDraw()
{
	if(TANGER_OCX_bDocOpen)
	{
	TANGER_OCX_OBJ.DoHandDraw(
	0,//����0��ʵ�� 0��4 //��ѡ����
	0x00ff0000,//��ɫ 0x00RRGGBB//��ѡ����
	3,//�ʿ�//��ѡ����
	200,//left//��ѡ����
	50//top//��ѡ����
	);
	}
}

//��ʼȫ���ֹ���ͼ���������ֹ���ʾ
function DoHandDraw2()
{
	if(TANGER_OCX_bDocOpen)
	{
	TANGER_OCX_OBJ.DoHandDraw2();
	}
}

//���ǩ�����
function DoCheckSign(key)
{
	if(TANGER_OCX_bDocOpen)
	{
	   var ret = TANGER_OCX_OBJ.DoCheckSign(false,key);

	   //��ѡ���� IsSilent ȱʡΪFAlSE����ʾ������֤�Ի���,����ֻ�Ƿ�����֤���������ֵ
	}
}
//����Ϊ��ǰ�汾�ĺ�����ʵ�ú���
//�˺�����������һ���Զ�����ļ�ͷ��
function TANGER_OCX_AddDocHeader(URL)
{
	try{
		//ѡ�����ǰ�ĵ�����������
		var curSel = TANGER_OCX_OBJ.ActiveDocument.Application.Selection;
		TANGER_OCX_SetMarkModify(false);
		curSel.WholeStory();
		curSel.Cut();
		//����ģ��
		TANGER_OCX_OBJ.AddTemplateFromURL(URL);
		var BookMarkName = "zhengwen";
		if(!TANGER_OCX_OBJ.ActiveDocument.BookMarks.Exists(BookMarkName))
		{
			alert("Word ģ���в���������Ϊ��\""+BookMarkName+"\"����ǩ��");
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
	  alert("����" + err.number + ":" + err.description);
	}
}

//���ԭ�ȵı�������OnSubmit�¼��������ĵ�ʱ���Ȼ����ԭ�ȵ��¼���
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

/*�˺����ڽϵͰ汾��IE������У���������
//Javascript��escape������
function TANGER_OCX_encodeObjValue(value)
{
	var t;
	t = value.replace(/%/g,"%25");
	return(t.replace(/&/g,"%26"));
}
*/
//�˺������������Զ��������ݴ�����Ϊ
//�ؼ���SaveToURL��������Ҫ�Ĳ���������
//һ��paraObj����paraObj.FFN��������
//���һ��<input type=file name=XXX>��name
//paraObj.PARA�����˱����������ݣ����磺
//f1=v1&f2=v2&f3=v3.����,v1.v2.v3�Ǿ���
//Javascript��escape������������ݡ����IE
//�İ汾�ϵͣ�����ʹ������ע�͵���TANGER_OCX_encodeObjValue
//�������������escape������
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

//�����ĵ�Ϊֻ��
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
		//alert("����" + err.number + ":" + err.description);
	}
	finally{
	}
}

//������ֹ�û��ӿؼ���������
function TANGER_OCX_SetNoCopy(boolvalue)
{
	TANGER_OCX_OBJ.IsNoCopy = boolvalue;
}

//������ֹ�ļ���>�½��˵�
function TANGER_OCX_EnableFileNewMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(0) = boolvalue;
}
//������ֹ�ļ���>�򿪲˵�
function TANGER_OCX_EnableFileOpenMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(1) = boolvalue;
}
//������ֹ�ļ���>����˵�
function TANGER_OCX_EnableFileSaveMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(3) = boolvalue;
}
//������ֹ�ļ���>���Ϊ�˵�
function TANGER_OCX_EnableFileSaveAsMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(4) = boolvalue;
}
//������ֹ�ļ���>��ӡ�˵�
function TANGER_OCX_EnableFilePrintMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(5) = boolvalue;
}
//������ֹ�ļ���>��ӡԤ���˵�
function TANGER_OCX_EnableFilePrintPreviewMenu(boolvalue)
{
	TANGER_OCX_OBJ.EnableFileCommand(6) = boolvalue;
}

//������ֹ��ʾ�޶��������͹��߲˵��������޶���
function TANGER_OCX_EnableReviewBar(boolvalue)
{

	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.CommandBars("Reviewing").Enabled = boolvalue;
	TANGER_OCX_OBJ.ActiveDocument.CommandBars("Track Changes").Enabled = boolvalue;
	TANGER_OCX_OBJ.IsShowToolMenu = boolvalue;	//�رջ�򿪹��߲˵�
}

//�򿪻��߹ر��޶�ģʽ
function TANGER_OCX_SetReviewMode(boolvalue)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.TrackRevisions = boolvalue;
}

//������˳��ۼ�����״̬�������������������
function TANGER_OCX_SetMarkModify(boolvalue)
{
	TANGER_OCX_SetReviewMode(boolvalue);
}

//��ʾ/����ʾ�޶�����
function TANGER_OCX_ShowRevisions(boolvalue)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.ShowRevisions = boolvalue;
}

//��ӡ/����ӡ�޶�����
function TANGER_OCX_PrintRevisions(boolvalue)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	TANGER_OCX_OBJ.ActiveDocument.PrintRevisions = boolvalue;
}

//�����û���
function TANGER_OCX_SetDocUser(cuser)
{
	if(!TANGER_OCX_bDocOpen)
		return;
	with(TANGER_OCX_OBJ.ActiveDocument.Application)
	{
		UserName = cuser;
	}
}

//����ҳ�沼��
function TANGER_OCX_ChgLayout()
{
 	try
	{
		TANGER_OCX_OBJ.showdialog(5); //����ҳ�沼��
	}
	catch(err){
		alert("����" + err.number + ":" + err.description);
	}
	finally{
	}
}

//��ӡ�ĵ�
function TANGER_OCX_PrintDoc()
{
	try
	{
		TANGER_OCX_OBJ.printout(true);
	}
	catch(err){
		alert("����" + err.number + ":" + err.description);
	}
	finally{
	}
}
//�˺�������ҳװ��ʱ�����á�������ȡ�ؼ����󲢱��浽TANGER_OCX_OBJ
//ͬʱ���������ó�ʼ�Ĳ˵�״�����򿪳�ʼ�ĵ��ȵȡ�
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
				info = "��Word�ĵ�";
				TANGER_OCX_OBJ.CreateNew("Word.Document");
				break;
			case "2":
				info = "��Excel������";
				TANGER_OCX_OBJ.CreateNew("Excel.Sheet");
				break;
			case "3":
				info = "��PowserPoint�õ�Ƭ";
				TANGER_OCX_OBJ.CreateNew("PowerPoint.Show");
				break;
			case "4":
				info = "�༭�ĵ�";
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
				info = "�Ķ��ĵ�";
				if(TANGER_OCX_attachURL)
				{
					TANGER_OCX_OBJ.BeginOpenFromURL(TANGER_OCX_attachURL,true,true);
				}
				break;
			default:
				info = "δ֪����";
		}

	}
	catch(err){
		//alert("����" + err.number + ":" + err.description);
		msg='����ʹ��΢��Office������ĵ���\n\n�Ƿ���ʹ�ý�ɽWPS���ִ���������ĵ���';
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
//�˺������ĵ��ر�ʱ�����á�
function TANGER_OCX_OnDocumentClosed()
{
	TANGER_OCX_bDocOpen = false;
}
//�˺����������浱ǰ�ĵ�����Ҫʹ���˿ؼ���SaveToURL������
//�йش˺�������ϸ�÷�������ı���ֲᡣ
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
			alert("�������󣺿ؼ��ĵڶ�������û��ָ����");
			return;
		}
		if(!TANGER_OCX_bDocOpen)
		{
			alert("û�д򿪵��ĵ���");
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
				alert("�ĵ������Ķ�״̬�������ܱ��浽��������");
			default:
				break;
		}
	}
	catch(err){
		alert("���ܱ��浽URL��" + err.number + ":" + err.description);
	}
	finally{
	}
}

//�˺������ĵ���ʱ�����á�
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
		s = "δ֪Ӧ�ó���";
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
		window.status = "OnDocumentOpened�¼���Script��������" + err.number + ":" + err.description;
	}
	finally{
	}
}

function TANGER_OCX_OnSignSelect(issign,signinfo)
{
   if(!issign)
      return;

   if(signinfo.indexOf("�û�:"+TANGER_OCX_user) == -1)
   {
   	  TANGER_OCX_SetReadOnly(true);
      TANGER_OCX_SetReadOnly(false);
   }
}