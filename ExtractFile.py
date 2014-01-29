import os.path
import re

def ExtractFile( dir ):
	p=re.compile(r'e:\MYOA\webroot')
	for root,dirs,files in os.walk(dir):
		for f in files:
			print(os.path.join(root.replace(r'e:\MYOA\webroot',''),f)).replace('\\','/')

			
if __name__ == "__main__":
	ExtractFile(r'e:\MYOA\webroot')