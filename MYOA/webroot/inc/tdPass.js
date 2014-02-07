//-------���豸---------
function OpenDevice(theDevice)
{
   try
   {
      theDevice.GetLibVersion();
   }
   catch(ex)
   {
	    //alert("��û�����ز���ȷ��װ�û�KEY��֤�ؼ�");
	    return false;
	 }
   try
   {
      theDevice.OpenDevice(1, "");
   }
   catch(ex)
   {
	    //alert("��û�в���Ϸ����û�KEY�����ܵ�¼ϵͳ!");
	    return false;
	 }
   return true;
}
//--------��ȡ�豸���к�---------
function READ_SN(theDevice)
{
  var bOpened = OpenDevice(theDevice);
  if(!bOpened)return -1;
  try
  {
    KeySN=theDevice.GetStrProperty(7, 0, 0);
    return KeySN;
  }
  catch(ex)
  {
	  theDevice.CloseDevice();
	  //alert("DoRead:No.1\nError#"+(ex.number&0xFFFF)+" \nDescription:"+ex.description);
	  return -1;
	}
}
//--------����ͻ���У��ֵ---------
function COMPUTE_DIGEST(theDevice,RandomData)
{
  var bOpened = OpenDevice(theDevice);
  if(!bOpened)return -1;
  try
  {
   theDevice.OpenFile (0,5);
   Digest =theDevice.HashToken (1,6,RandomData);
   theDevice.CloseFile();
   return Digest;
  }
  catch(ex)
  {
	  theDevice.CloseDevice();
	  //alert("DoRead:No.1\nError#"+(ex.number&0xFFFF)+" \nDescription:"+ex.description);
	  return -1;
	}
}
//--------��ȡ�豸�û���---------
function READ_KEYUSER(theDevice)
{
  var bOpened = OpenDevice(theDevice);
  if(!bOpened)return -1;
  try
  {
    theDevice.OpenFile (0,3);
    FileLen = theDevice.GetFileInfo(0,3,3,0);
    Key_UserID=theDevice.Read(0,0,0,FileLen);
    theDevice.CloseFile();
    return Key_UserID;
  }
  catch(ex)
  {
	  theDevice.CloseDevice();
	  //alert("DoRead:No.1\nError#"+(ex.number&0xFFFF)+" \nDescription:"+ex.description);
	  return -1;
  }
}
//--------�ж��豸�û���---------
function CHECK_USER(USER_SN,theDevice)
{	
  var bOpened = OpenDevice(theDevice);
  if(!bOpened)return -1;
  try
  { 
    KeySN=READ_SN(theDevice);
    if(USER_SN!=KeySN) return 0;
    else return 1;
  }
  catch(ex)
  {
	  theDevice.CloseDevice();
	  //alert("DoRead:No.1\nError#"+(ex.number&0xFFFF)+" \nDescription:"+ex.description);
	  return -1;
	}
}