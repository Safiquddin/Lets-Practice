 #!/bin/bash
read -p "Enter Y or n: " ANSWER
case "$ANSWER" in 
[yY]|[eE]) 
echo "you answear yes" 
;;
[nN]|[oO])
echo "you answear no"
;;
 *)
echo "invalid answear"
;;
esac
