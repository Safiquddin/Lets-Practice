~#!/bin/bash-xv
if [ -f $1 ];
then echo "it is a regular file: $1 "
elif [ -d $1 ]
then echo "it is a directory: $1 "
else echo "no file specified"
fi
