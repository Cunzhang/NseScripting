function tb_addnew(lv_tb_id,read_only,row_value,sum,cal)
{
  var mytable=document.all(lv_tb_id);
  var size_array=mytable.FormData.split("`");
  var row_value_array=row_value.split("`");
  var sum_flag=0;
  if(sum!='')
  {
    var sum_array=sum.split("`");
    for(i=0;i<sum_array.length;i++)
    {
      if(sum_array[i]==1) 
      {
        sum_flag=1;
        break;
      }
    }
  }
  if(cal!='')
    var cal_array=cal.split("`");

  maxcell=mytable.rows(0).cells.length;
  if(mytable.rows.length==1 || sum_flag==0)
    mynewrow = mytable.insertRow();
  else
    mynewrow = mytable.insertRow(mytable.rows.length-1);
  for(i=0;i<maxcell-1;i++)
  {
    mynewcell=mynewrow.insertCell();
    cell_html="<input type=text ";
    cell_html+=" size="+ size_array[i];
    if(row_value!="")
       cell_html+=" value=\""+ row_value_array[i]+"\"";
    if(read_only || (cal_array && cal_array[i]!=''))
       cell_html+=" readonly class=BigStatic";
    else
    	 cell_html+=" class=BigInput";
    cell_html+=">";
    mynewcell.innerHTML=cell_html;
  }

  mynewcell=mynewrow.insertCell();
  if(!read_only)
     mynewcell.innerHTML="<input type=button value=删除 onclick=tb_delete('"+lv_tb_id+"',this)>";
  if(sum_flag==1 && mytable.rows.length==2)
    tb_add_sum(lv_tb_id,sum,sum_flag);
}

function tb_add_sum(lv_tb_id,sum,sum_flag)
{
  var mytable=document.all(lv_tb_id);
  var size_array=mytable.FormData.split("`");
  var sum_array=sum.split("`");
  var maxcell=mytable.rows(0).cells.length;
  //增加合计
  sumrow=mytable.insertRow();
  sumrow.setAttribute('id',lv_tb_id+'_sum');
  for(i=0;i<maxcell-1;i++)
  {
    sumcell=sumrow.insertCell();
    if(sum_array && sum_array[i]==1)
    {
      cell_html="<input type=text style='border:none;background:#ffffff;text-align:right;' size="+size_array[i]+" readonly class=BigStatic>";
      sumcell.innerHTML=cell_html;
    }
  }
  sumcell=sumrow.insertCell(); 
  sumcell.innerHTML="<input type=button value=合计 onclick=tb_sum('"+lv_tb_id+"','"+sum+"')>";
  
  setInterval("tb_sum('"+lv_tb_id+"','"+sum+"')",2000);
}

function tb_delete(lv_tb_id,del_btn)
{
  var mytable=document.all(lv_tb_id);
  mytable.deleteRow(del_btn.parentElement.parentElement.rowIndex);
  if(mytable.rows.length==2 && document.all(lv_tb_id+"_sum"))
    mytable.deleteRow(1);
}

function tb_output(lv_tb_id)
{
  var data_str="";
  var row_length=document.all(lv_tb_id).rows.length;
  if(document.all(lv_tb_id+'_sum'))
    row_length--;
  for (i=1; i < row_length; i++)
  {
      for (j=0; j < document.all(lv_tb_id).rows(i).cells.length-1; j++)
      {
          data_str+=document.all(lv_tb_id).rows(i).cells(j).firstChild.value+"`";
      }
      data_str+="\n";
  }

  lv_id="DATA_"+lv_tb_id.substr(3);
  document.all(lv_id).value=data_str;
}

function LV_Submit()
{
  var lv_tb_id="";
  for (lv_i=0;lv_i<document.all.length; lv_i++)
  {
       if(document.all(lv_i).className=="LIST_VIEW")
       {
          lv_tb_id=document.all(lv_i).id;
          tb_output(lv_tb_id);
       }
  }
}
function tb_sum(lv_tb_id,sum)
{
  var mytable=document.all(lv_tb_id);
  if(mytable.rows.length==1) return;
  var sumrow=mytable.rows(mytable.rows.length-1);
  var sum_array=sum.split("`");
  for(i=0;i<sum_array.length;i++)
  {
    var sum_value=0;
    if(sum_array[i]==1)
    {
      for(j=1;j<mytable.rows.length-1;j++)
      {
        sum_value+=parseFloat(mytable.rows(j).cells(i).firstChild.value==''?0:mytable.rows(j).cells(i).firstChild.value);
      }
      if(isNaN(sum_value))
        sumrow.cells(i).firstChild.value="0";
      else
        sumrow.cells(i).firstChild.value=Math.round(sum_value*10000)/10000;
    }
  }
}

function tb_cal(lv_tb_id,cal)
{
  var mytable=document.all(lv_tb_id);
  if(mytable.rows.length==1) return;
  if(cal)
  {
    var cal_array=cal.split("`");
    for(i=1;i<mytable.rows.length-1;i++)
    {
      for(k=0;k<cal_array.length-1;k++)
      {
        var cal_str=cal_array[k];
        if(cal_str=="")
          continue;
        for(j=0;j<mytable.rows(i).cells.length-1;j++)
        {
          cell_value=parseFloat(mytable.rows(i).cells(j).firstChild.value);
          cal_str=cal_str.replace("["+(j+1)+"]",cell_value);
        }
        mytable.rows(i).cells(k).firstChild.value=isNaN(eval(cal_str))?0:Math.round(parseFloat(eval(cal_str))*10000)/10000;
      }
    }
  }
}

function convertCurrency(currencyDigits) {
// Constants:
var MAXIMUM_NUMBER = 99999999999.99;
// Predefine the radix characters and currency symbols for output:
var CN_ZERO = "零";
var CN_ONE = "壹";
var CN_TWO = "贰";
var CN_THREE = "叁";
var CN_FOUR = "肆";
var CN_FIVE = "伍";
var CN_SIX = "陆";
var CN_SEVEN = "柒";
var CN_EIGHT = "捌";
var CN_NINE = "玖";
var CN_TEN = "拾";
var CN_HUNDRED = "佰";
var CN_THOUSAND = "仟";
var CN_TEN_THOUSAND = "万";
var CN_HUNDRED_MILLION = "亿";
//var CN_SYMBOL = "人民币";
var CN_DOLLAR = "元";
var CN_TEN_CENT = "角";
var CN_CENT = "分";
var CN_INTEGER = "整";

// Variables:
var integral; // Represent integral part of digit number.
var decimal; // Represent decimal part of digit number.
var outputCharacters; // The output result.
var parts;
var digits, radices, bigRadices, decimals;
var zeroCount;
var i, p, d;
var quotient, modulus;

// Validate input string:
currencyDigits = currencyDigits.toString();
if (currencyDigits == "") {
return "";
}
if (currencyDigits.match(/[^,.\d]/) != null) {
return "";
}
if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
return "";
}

// Normalize the format of input digits:
currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
// Assert the number is not greater than the maximum number.
if (Number(currencyDigits) > MAXIMUM_NUMBER) {
return "";
}

// Process the coversion from currency digits to characters:
// Separate integral and decimal parts before processing coversion:
parts = currencyDigits.split(".");
if (parts.length > 1) {
integral = parts[0];
decimal = parts[1];
// Cut down redundant decimal digits that are after the second.
decimal = decimal.substr(0, 2);
}
else {
integral = parts[0];
decimal = "";
}
// Prepare the characters corresponding to the digits:
digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
decimals = new Array(CN_TEN_CENT, CN_CENT);
// Start processing:
outputCharacters = "";
// Process integral part if it is larger than 0:
if (Number(integral) > 0) {
zeroCount = 0;
for (i = 0; i < integral.length; i++) {
p = integral.length - i - 1;
d = integral.substr(i, 1);
quotient = p / 4;
modulus = p % 4;
if (d == "0") {
zeroCount++;
}
else {
if (zeroCount > 0)
{
outputCharacters += digits[0];
}
zeroCount = 0;
outputCharacters += digits[Number(d)] + radices[modulus];
}
if (modulus == 0 && zeroCount < 4) {
outputCharacters += bigRadices[quotient];
}
}
outputCharacters += CN_DOLLAR;
}
// Process decimal part if there is:
if (decimal != "") {
for (i = 0; i < decimal.length; i++) {
d = decimal.substr(i, 1);
if (d != "0") {
outputCharacters += digits[Number(d)] + decimals[i];
}
}
}
// Confirm and return the final output string:
if (outputCharacters == "") {
outputCharacters = CN_ZERO + CN_DOLLAR;
}
if (decimal == "") {
outputCharacters += CN_INTEGER;
}
//outputCharacters = CN_SYMBOL + outputCharacters;
return outputCharacters;
}


function calc_getval(val,func)
{
	if(func=='NULL')
	{
	  if(val.indexOf("-")>0)
	  {
	    date_flag=1;
	    val=val.replace("-","/");
	    var d=new Date(val);
	    return d.getTime()/1000;
	  }
    if(val=="")
      val=0;
    if(isNaN(val))
      val=0;
    return parseFloat(val);
  }
  else
  {
  	switch(func)
  	{
  		case 'ABS':
  			return Math.abs(parseFloat(val));
  			break;
  		case 'MAX':
  		{
  			var num_array=val.split(",");
  			var max_num=num_array[0];
			for(var i=0;i<num_array.length;i++)
			{
				max_num=Math.max(max_num,num_array[i]);
			}
			return parseFloat(max_num);
		}
		break;
		case 'MIN':
		{
  			var num_array=val.split(",");
  			var min_num=num_array[0];
			for(var i=0;i<num_array.length;i++)
			{
				min_num=Math.min(min_num,num_array[i]);
			}
			return parseFloat(min_num);
		}
		break;
		case 'RMB':
			return convertCurrency(val);
		break;
   }//switch
 }//else

}

function td_calendar(fieldname)
{
  if(fieldname!="")
  {
     myleft=event.clientX;
     mytop=event.clientY+180;
     window.showModalDialog("/inc/calendar.php?TIME=1&FIELDNAME=document.form1."+fieldname,self,"edge:raised;scroll:0;status:0;help:0;resizable:1;dialogWidth:280px;dialogHeight:260px;dialogTop:"+mytop+"px;dialogLeft:"+myleft+"px");
  }
}

function SaveFile(ATTACHMENT_ID,ATTACHMENT_NAME)
{
  URL="/module/save_file?ATTACHMENT_ID="+ATTACHMENT_ID+"&ATTACHMENT_NAME="+ATTACHMENT_NAME+"&A=1";
  loc_x=screen.availWidth/2-200;
  loc_y=screen.availHeight/2-90;
  window.open(URL,null,"height=180,width=400,status=1,toolbar=no,menubar=no,location=no,scrollbars=yes,top="+loc_y+",left="+loc_x+",resizable=yes");
}

function go_sign()
{
  scroll(0,10000);
  document.form1.CONTENT.focus();
  sign_color('#F7B326');
  setTimeout("sign_color('white')",80);
  setTimeout("sign_color('#F7B326')",160);
  setTimeout("sign_color('white')",240);
  setTimeout("sign_color('#F7B326')",320);
  setTimeout("sign_color('white')",400);
  setTimeout("sign_color('#FEF3DE')",480);
}

function sign_color(color)
{
  document.form1.CONTENT.style.background=color;
}

function go_public()
{
  document.form1.ATTACHMENT.focus();
}

function SelectSign()
{
  loc_x=(screen.availWidth-300)/2;
  loc_y=event.clientY-100;
  window.open("feed_history.php","FEED_HISTORY","status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,width=300,height=400,left="+loc_x+",top="+loc_y);
}

function save_notice()
{
  fade(notice_div,1)
  window.setTimeout("fade(notice_div,0)",3000);  
}

function auto_btn(id)
{
	if(id.style.display=="none")
	   id.style.display="";
	else
		 id.style.display="none";
}

function clear_user()
{
  document.form1.TO_NAME.value="";
  document.form1.TO_ID.value="";
}

function LoadWindow(item)
{
  URL="/module/flow_user_select?ITEM="+item;
  loc_x=200;
  loc_y=200;
  window.showModalDialog(URL,self,"edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:600px;dialogHeight:400px;dialogTop:"+loc_y+"px;dialogLeft:"+loc_x+"px");
}

function sel_attach(div_id,dir_field,name_field,disk_id)
{
   var URL="/module/sel_file?EXT_FILTER=&MULTI_SELECT=1&DIV_ID=" + div_id + "&DIR_FIELD=" + dir_field + "&NAME_FIELD=" + name_field + "&TYPE_FIELD=" + disk_id;
   window.open(URL,null,"height=300,width=500,status=0,toolbar=no,menubar=no,location=no,scrollbars=yes,top=200,left=300,resizable=yes");
}

function fade(div,fade_flag)
{
  with(div)
  {
    filters.blendTrans.apply();
    style.visibility=fade_flag?'':'hidden';
    filters.blendTrans.play();
  }
}

function view_focus(time)
{
  focus_info.style.left=0;
  focus_info.style.top=document.body.scrollTop;
  fade(focus_info,1);
  window.setTimeout("fade(focus_info,0)",time*1000);  
}

function delay_remind(time)
{
  delay.style.left=(document.body.clientWidth-delay.clientWidth)/2+document.body.scrollLeft;
  delay.style.top=(document.body.clientHeight-delay.clientHeight)/3+document.body.scrollTop;
  fade(delay,1);
  window.setTimeout("fade(delay,0)",time*1000);  
}
