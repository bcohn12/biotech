#!/usr/bin/python

import sys
import os

link = 'http://localhost:3000/receive'
data = 's1='+ str(sys.argv[1]) + '&' +'s2='+ str(sys.argv[2]) + '&' + 's3='+ str(sys.argv[3]) + '&' + 's4='+ str(sys.argv[4]) + '&' + 's5='+ str(sys.argv[5]) + '&' + 's6='+ str(sys.argv[6]) + '&' + 's7='+ str(sys.argv[7]) + '&' + 's8='+ str(sys.argv[8]) + '&' 

command = 'curl --data \"' + data + '\" ' + link

os.system(command)