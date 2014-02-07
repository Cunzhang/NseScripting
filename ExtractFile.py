import sys
import os.path
import re

infile = sys.argv[1]
def ExtractFile( dir ):
	p=re.compile(dir)
	for root,dirs,files in os.walk(dir):
		for f in files:
			print (os.path.join(root.replace(dir,''),f)).replace('\\','/')
        
			
if __name__ == "__main__":
	ExtractFile(infile)
