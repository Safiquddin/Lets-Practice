#!/bin/bash
HOST="google.com"
ping -c 1 Google.com
if [ "$?" -eq "0" ]
then
sleep 5
echo "$HOST rechable"
else
echo "$HOST unrechable"
fi 

