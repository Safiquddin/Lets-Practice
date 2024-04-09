#!/bin/bash

for log4j in `cat log4list`
do
	echo -e "\n\t${log4j}"
	cd $log4j
	USER=$(ls -l $log4j/log4j-* |  awk '{ print $3 }' | uniq)
	rm -rf log4j-*
	cp /tmp/log4j/log4j-* .
	chmod 755 log4j-*
	chown $USER:$USER log4j-*
done

