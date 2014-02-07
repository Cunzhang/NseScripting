<?
//-- MYOA网页根目录配置(Apache:自动获取) --
$ROOT_PATH=getenv("DOCUMENT_ROOT");

//-- MYOA网页根目录配置(IIS:手工配置) --
//$ROOT_PATH="d:/myoa/webroot/";

if(substr($ROOT_PATH,-1)!="/")
   $ROOT_PATH.="/";

//-- MYOA附件路径配置(Windows) --
$ATTACH_PATH=$ROOT_PATH."attachment/";
$ATTACH_PATH2=realpath($ROOT_PATH."../")."/attach/";

//-- 数据库热备份路径 --
$BACKUP_PATH=realpath($ROOT_PATH."../")."/bak/";

//-- MYOA附件路径配置(Unix/Linux) --
//$ATTACH_PATH="/myoa/attachment/";
//$ATTACH_PATH2="/myoa/attach/";

//-- MYOA短信刷新时间，单位秒 --
$SMS_REF_SEC=30;

//-- MYOA在线刷新时间，单位秒 --
$ONLINE_REF_SEC=120;

//-- MYOA在线编辑Office文档锁定间隔时间，单位秒 --
$ATTACH_LOCK_REF_SEC=180;

//-- 空闲强制自动离线时间，单位分钟，0为不限制 --
$OFFLINE_TIME_MIN=0;

//-- 状态栏自动刷新时间，单位秒 --
$STATUS_REF_SEC=3600;

//-- 短信最多提醒次数，0为不限制 --
$SMS_REF_MAX=3;

//-- 工作流催办监控周期 单位分钟--
$FLOW_REMIND_TIME=30;

//-- 上传附件类型限制 --
$UPLOAD_LIMIT = 1;        //0 不限制；1 不允许上传下边定义的后缀名的附件；2 只允许上传下边定义的后缀名的附件
$UPLOAD_LIMIT_TYPE="php,php3,php4,php5,*,";

//-- 第一、二套界面主题是否使用按钮的样式效果，把第48行的1改为0表示使用普通效果 --
$CORRECT_BUTTON = 1;
$CORRECT_BUTTON = $CORRECT_BUTTON && ($LOGIN_THEME=="1" || $LOGIN_THEME=="2");

//-- MYOA数据库配置 --
$MYSQL_SERVER="localhost:3306";
$MYSQL_USER="root";
$MYSQL_DB="TD_OA";
$MYSQL_PASS="myoa888";
?>