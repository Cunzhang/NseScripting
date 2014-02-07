import sys
import os.path
import re

infile = sys.argv[1]
def ExtractFile( dir ):
	p=re.compile(dir)
	for root,dirs,files in os.walk(dir):
		for f in files:
			print '\x1b[0;32m' + (os.path.join(root.replace(dir,''),f)).replace('\\','/') + '\x1b[0m'
        
			
if __name__ == "__main__":
	ExtractFile(infile)
