
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var elActive=null;
function MouseOverBtn()
{
   var theEvent = window.event || arguments[0];
   var el = theEvent.srcElement || theEvent.target;
   if(el.className!="TableRowActive")
      el.className="TableRowHover";
}
function MouseOutBtn()
{
   var theEvent = window.event || arguments[0];
   var el = theEvent.srcElement || theEvent.target;
   if(el.className!="TableRowActive")
      el.className="";
}
function ClickBtn()
{
   var theEvent = window.event || arguments[0];
   var el = theEvent.srcElement || theEvent.target;
   if(elActive)
      elActive.className="";
   el.className="TableRowActive";
   elActive=el;
}
function initTr()
{
   var tables = document.getElementsByTagName("TABLE");
   for(var i=0; i<tables.length; i++)
   {
      var table = tables[i];
      if(table.className.indexOf(" trHover")<0)
         continue;
      
      for(var j=0; j<table.rows.length; j++)
      {
         var el=table.rows[j];
         var elClass = el.className.toLowerCase();
         if(elClass!="tabledata" && elClass!="tableline1" && elClass!="tableline2")
            continue;
         
         if(is_ie)
         {
            el.attachEvent("onmouseover", MouseOverBtn);
            el.attachEvent("onmouseout",  MouseOutBtn);
            el.attachEvent("onclick",  ClickBtn);
         }
         else
         {
            el.addEventListener("mouseover", MouseOverBtn,false);
            el.addEventListener("mouseout",  MouseOutBtn,false);
            el.addEventListener("onclick",  ClickBtn,false);
         }
      }
   }
}
if(is_ie)
   window.attachEvent("onload", initTr);
else
   window.addEventListener("load", initTr,false);