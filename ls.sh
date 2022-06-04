#!/bin/bash -v
cd /home/osepa/Downloads
FILE=$(ls *)
for files in $FILE
do echo "$files" 
done
