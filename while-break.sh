#!/bin/bash
while true
do 
read -p "1:show disk usage. 2:show uptime. " CHOICE
case "$CHOICE" in
1)
df -h
;;
2)
uptime
;;
*)
break
;;
esac
done
