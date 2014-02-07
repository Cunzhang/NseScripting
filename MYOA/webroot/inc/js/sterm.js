//��������
function sTerm(year,month,date){
   var monthLength=D0(year,month+1,date) - D0(year,month,date);
   
   var sN0=2*month-2;
   var sDt0=S(year,sN0,1);
   var sD0=revD0(year,floor(sDt0));
   var sM0=floor(sD0/100);
   sDate0=sD0%100;

   var sN1=2*month-1;
   var sDt1=S(year,sN1,1);
   var sD1=revD0(year,floor(sDt1));
   var sM1=floor(sD1/100);
   var sDate1=sD1%100;

   var sN2=2*month;
   var sDt2=S(year,sN2,1);
   var sD2=revD0(year,floor(sDt2));
   var sM2=floor(sD2/100);
   var sDate2=sD2%100;

   var sN3=2*month+1;
   if(sN3>24)
      sN3-=24;
   var sDt3=S(year,sN3,1);
   var sD3=revD0(year,floor(sDt3));
   var sM3=floor(sD3/100);
   var sDate3=sD3%100;

   if(sM0==month){
     sN2=sN1; sN1=sN0;
     sDt2=sDt1; sDt1=sDt0;
     sDate2=sDate1; sDate1=sDate0;
   }

   if(sM3==month){
     sN1=sN2; sN2=sN3;
     sDt1=sDt2; sDt2=sDt3;
     sDate1=sDate2; sDate2=sDate3;
   }

   sN1=rem(sN1-1,24)+1;
   sN2=rem(sN2-1,24)+1;

   if(sDate2>monthLength){
     sDate2-=monthLength;
   }

   if(date==sDate1)
     return sStr(sN1);
   else if(date==sDate2)
     return sStr(sN2);
   else
     return '';
}

//��������
function S(y,n,pd){  //pdȡֵΪ0��1���ֱ��ʾƽ���Ͷ���,�ú������ؽ�����D0ֵ
  var juD=y*(365.2423112-6.4e-14*(y-100)*(y-100)-3.047e-8*(y-100))+15.218427*n+1721050.71301;//������
  var tht=3e-4*y-0.372781384-0.2617913325*n;//�Ƕ�
  var yrD=(1.945*sin(tht)-0.01206*sin(2*tht))*(1.048994-2.583e-5*y);//���ʵ����
  var shuoD=-18e-4*sin(2.313908653*y-0.439822951-3.0443*n);//˷��ʵ����
  var vs=(pd)?(juD+yrD+shuoD-ESD(y,1,0)-1721425):(juD-ESD(y,1,0)-1721425);
  return vs;
}

//����
function sStr(v){
  return 'С����������ˮ���ݴ���������������С��â������С��������ﴦ���¶��ֺ�¶˪������Сѩ��ѩ����'.substring(2*v-2,2*v);
}

//�ж�Gregorian������Julian��
function ifGr(y,m,d){  //����y��m��(1,2,..,12,��ͬ)d��=1,2,3�ֱ��ʾ��׼����,Gregorge����Julian������ͬ��������ν����׼������ָ��1582-10-4֮ǰ����Julian��1582-10-15�Ժ����Gregorian��1582-10-5 ~ 1582-10-14Ϊ�ա�
   if(y>1582||(y==1582&&m>10)||(y==1582&&m==10&&d>14))
     return 1;  //Gregorian
   else
     if(y==1582&&m==10&&d>=5&&d<=14)
       return -1;  //��
     else
       return 0;  //Julian
}

//�ղ�����
function D0(y,m,d){
  var ifG=ifGr(y,m,d);
  var monL=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);

  if(ifG==-1){
    return Infinity;
  }

  if(ifG==1){
    if((y%100!=0&&y%4==0)||(y%400==0)){
      monL[2]+=1;
    }
    else ;
  }
  else{
    if(y%4==0){
      monL[2]+=1;
    }
    else ;
  }

  var v=0;
  for(var i=0;i<=m-1;i++){
    v+=monL[i];
  }
  v+=d;

  return v;
}

//���ղ�����
function revD0(y,x){  // y���ղ�����D0Ϊx
  var j,m,mL;

  for(j=1;j<=12;j++){
    mL=D0(y,j+1,1)-D0(y,j,1);

    if(x<=mL||j==12){
      m=j;
      break;
    }
    else{
       x-=mL;
    }

  }

  if(y==1582&&m==10&&x>=5&&x<=14){
    return Infinity;
  }

  return 100*m+x;
}

//��׼����(Standard Days)(y��m��d�վ�����Ƶ�1��1��0�յ�����)
function SD(y,m,d){
  if(ifGr(y,m,d)==-1)
    return Infinity;

  if(ifGr(y,m,d)==1)
    return (y-1)*365+floor((y-1)/4)-floor((y-1)/100)+floor((y-1)/400)+D0(y,m,d);   //Gregorian�ı�׼����

  else
    return (y-1)*365+floor((y-1)/4)+D0(y,m,d);                                     //Julian�ı�׼����

}

//��Ч��׼����(Equivalent Standard Days)(y��m��d�վ�����Ƶ�1��1��0�յ�����)
function ESD(y,m,d){
  if(ifGr(y,m,d)==-1)
    return Infinity;

  if(ifGr(y,m,d)==1)
    return SD(y,m,d);   //Gregorian�ı�׼����

  else
    return SD(y,m,d)-2;   //Julian�ı�׼����

}

function tail(x){
  return x-floor(x);
}
//��������
function rem(x,w){
  return tail(x/w)*w;
}

function sin(x){
  return Math.sin(x);
}

function floor(x){
  return Math.floor(x);
}
