//改变图片大小
function resizepic(thispic)
{
  if(thispic.width>1024) 
     thispic.width=1024;
}
//无级缩放图片大小
function bbimg(o)
{
  var zoom=parseInt(o.style.zoom, 10)||100;
  zoom+=event.wheelDelta/12;
  if (zoom>0) o.style.zoom=zoom+'%';
  return false;
}
//双击鼠标滚动屏幕的代码
var currentpos,timer;
function initialize()
{
  timer=setInterval ("scrollwindow ()",30);
}
function sc()
{
  clearInterval(timer);
}
function scrollwindow()
{
  currentpos=parent.open_main.body.scrollTop;
  window.scroll(0,++currentpos);
  if (currentpos !=parent.open_main.body.scrollTop)
     sc();
}
parent.open_main.onmousedown=sc
parent.open_main.ondblclick=initialize

//上一张 下一张
function open_pic(pic_id,sub_dir,file_name)
{
   parent.open_main.location="open_main.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&CONTROL_FLAG="+2;
   location="open_control.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name;
}

//鼠标点下一张
function open_pic1(pic_id,sub_dir,file_name)
{
   parent.open_main.location="open_main.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&CONTROL_FLAG="+2+"&DOT_FLAG="+1;
   parent.open_control.location="open_control.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name;
}
//放大
function blowup(pic_id,sub_dir,file_name,mywidth,myheight,my_flag)
{
	 up_width=mywidth * 1.1;
	 up_height=myheight * 1.1;
	 if(my_flag==1)
	 {
	 	  up_width=readcookie("Cookie_width") * 1.1;
	    up_height=readcookie("Cookie_height") * 1.1;
	//    alert(up_width);
	 	}
   parent.open_main.location="open_main.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&FILE_WIDTH="+up_width+"&FILE_HEIGHT="+up_height+"&CONTROL_FLAG="+1;
   location="open_control.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&FILE_WIDTH="+up_width+"&FILE_HEIGHT="+up_height;
}
//缩小
function reduce(pic_id,sub_dir,file_name,mywidth,myheight,my_flag)
{
	 up_width=mywidth * 0.9;
	 up_height=myheight * 0.9;
	 if(my_flag==1)
	 {
	 	  up_width=readcookie("Cookie_width") * 1.1;
	    up_height=readcookie("Cookie_height") * 1.1;
	//    alert(up_width);
	 	}	 
   parent.open_main.location="open_main.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&FILE_WIDTH="+up_width+"&FILE_HEIGHT="+up_height+"&CONTROL_FLAG="+1;
   location="open_control.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&FILE_WIDTH="+up_width+"&FILE_HEIGHT="+up_height;
}
//最适合  实际大小
function adapt(pic_id,sub_dir,file_name,mywidth,myheight,flag,use_flag,true_width,true_height)
{
	 if(flag==1)
	 {
	   up_width=mywidth;
	   up_height=myheight;
   }
	 if(flag==2)
	 { 
	 	 if(mywidth > parent.open_main.document.body.clientWidth && myheight <= parent.open_main.document.body.clientHeight)
	   { //alert(1);
	   	  temp_var=mywidth/parent.open_main.document.body.clientHeight;
	   	  up_width=parent.open_main.document.body.clientWidth;
	   	  up_height=myheight*(1/temp_var);
	   }
	   if(myheight > parent.open_main.document.body.clientHeight && mywidth <= parent.open_main.document.body.clientWidth)
	   { //alert(2);
	   	  temp_var=myheight/parent.open_main.document.body.clientHeight;
	   	  up_height=parent.open_main.document.body.clientHeight;
	   	  up_width=mywidth*(1/temp_var);
	   }
	 	 if(mywidth > parent.open_main.document.body.clientWidth && myheight > parent.open_main.document.body.clientHeight)
	   { 
	   	  if(mywidth >= myheight)
	   	  {//alert(3);
	   	  	 temp_var=myheight/parent.open_main.document.body.clientHeight;
	   	  	 up_height=parent.open_main.document.body.clientHeight;
	   	  	 //alert(up_height);
	   	     up_width=mywidth*(1/temp_var);
	   	  }	   	  
	   	  else
	   	  {//alert(4);
	   	  	temp_var=mywidth/parent.open_main.document.body.clientWidth;
	   	    up_width=parent.open_main.document.body.clientWidth;
	   	    up_height=myheight*(1/temp_var);  	
	   	  }	
	   }

	 	 if(mywidth < parent.open_main.document.body.clientWidth && myheight < parent.open_main.document.body.clientHeight)
	   {	   	 
	   	  if(mywidth >= myheight)
	   	  {//alert(5);
	   	  	 temp_var=myheight/parent.open_main.document.body.clientHeight;
	   	  	 up_height=parent.open_main.document.body.clientHeight;
	   	     up_width=mywidth*(temp_var);

	   	  }	   	  
	   	  else
	   	  {// alert(6);
	   	  	temp_var=mywidth/parent.open_main.document.body.clientWidth;   	    
	   	    up_width=parent.open_main.document.body.clientWidth;
	   	    up_height=myheight*(1/temp_var);
	   	  }
	   }
	   
	 	 if(true_width < parent.open_main.document.body.clientWidth && true_height < parent.open_main.document.body.clientHeight)
	   {
	   	  up_height=true_height;
	   	  up_width=true_width;
	   }	   
	   	    
   }   	   	     
   
   setCookie("Cookie_width", up_width);  
   setCookie("Cookie_height", up_height);

   if(use_flag == 1)
   { 
      parent.open_main.location="open_main.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&FILE_WIDTH="+up_width+"&FILE_HEIGHT="+up_height;
      location="open_control.php?PIC_ID="+pic_id+"&SUB_DIR="+sub_dir+"&FILE_NAME="+file_name+"&FILE_WIDTH="+up_width+"&FILE_HEIGHT="+up_height;
   }
   if(use_flag == 2)
   {
   	 // alert(up_height);
	 	  if(mywidth < parent.open_main.document.body.clientWidth && myheight < parent.open_main.document.body.clientHeight)
      {
         parent.open_main.image.width =mywidth;
         parent.open_main.image.height =myheight;      	
       }
       else
       {	
         parent.open_main.image.width =up_width;
         parent.open_main.image.height =up_height;
       }
   
    }  
}

function setCookie(name,value) {
   var today = new Date();
   var expires = new Date();
   expires.setTime(today.getTime() + 1000*60*60*24*2000);
   document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString();
   //alert(name);alert(escape(value));
   //alert(document.cookie);
}

function readcookie(name)
{
	var mycookie = document.cookie; 
  var start1 = mycookie.indexOf(name + "=");
  if (start1== -1)
     alert("cookies not found");
  else
  {
     start=mycookie.indexOf("=",start1)+1; 
     var end = mycookie.indexOf(";",start);
     if (end==-1)
     {
        end=mycookie.length;
     }
     var value=unescape(mycookie.substring(start,end));
     if (value==null)
     {alert("No cookies found!");}
     else
     {
     	return(value);
     	}
   }
}

