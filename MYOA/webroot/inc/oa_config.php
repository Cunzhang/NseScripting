<?
//-- MYOA��ҳ��Ŀ¼����(Apache:�Զ���ȡ) --
$ROOT_PATH=getenv("DOCUMENT_ROOT");

//-- MYOA��ҳ��Ŀ¼����(IIS:�ֹ�����) --
//$ROOT_PATH="d:/myoa/webroot/";

if(substr($ROOT_PATH,-1)!="/")
   $ROOT_PATH.="/";

//-- MYOA����·������(Windows) --
$ATTACH_PATH=$ROOT_PATH."attachment/";
$ATTACH_PATH2=realpath($ROOT_PATH."../")."/attach/";

//-- ���ݿ��ȱ���·�� --
$BACKUP_PATH=realpath($ROOT_PATH."../")."/bak/";

//-- MYOA����·������(Unix/Linux) --
//$ATTACH_PATH="/myoa/attachment/";
//$ATTACH_PATH2="/myoa/attach/";

//-- MYOA����ˢ��ʱ�䣬��λ�� --
$SMS_REF_SEC=30;

//-- MYOA����ˢ��ʱ�䣬��λ�� --
$ONLINE_REF_SEC=120;

//-- MYOA���߱༭Office�ĵ��������ʱ�䣬��λ�� --
$ATTACH_LOCK_REF_SEC=180;

//-- ����ǿ���Զ�����ʱ�䣬��λ���ӣ�0Ϊ������ --
$OFFLINE_TIME_MIN=0;

//-- ״̬���Զ�ˢ��ʱ�䣬��λ�� --
$STATUS_REF_SEC=3600;

//-- ����������Ѵ�����0Ϊ������ --
$SMS_REF_MAX=3;

//-- �������߰������� ��λ����--
$FLOW_REMIND_TIME=30;

//-- �ϴ������������� --
$UPLOAD_LIMIT = 1;        //0 �����ƣ�1 �������ϴ��±߶���ĺ�׺���ĸ�����2 ֻ�����ϴ��±߶���ĺ�׺���ĸ���
$UPLOAD_LIMIT_TYPE="php,php3,php4,php5,*,";

//-- ��һ�����׽��������Ƿ�ʹ�ð�ť����ʽЧ�����ѵ�48�е�1��Ϊ0��ʾʹ����ͨЧ�� --
$CORRECT_BUTTON = 1;
$CORRECT_BUTTON = $CORRECT_BUTTON && ($LOGIN_THEME=="1" || $LOGIN_THEME=="2");

//-- MYOA���ݿ����� --
$MYSQL_SERVER="localhost:3306";
$MYSQL_USER="root";
$MYSQL_DB="TD_OA";
$MYSQL_PASS="myoa888";
?>