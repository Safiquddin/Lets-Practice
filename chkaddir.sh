#!/bin/bash
read -p "Enter Directory name to check" ndir
if [ -d "ndir" ]
then echo "Directory exist"
else mkdir $ndir
echo "Directory Created"
fi
