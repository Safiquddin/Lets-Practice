#!/bin/bash
expire_date=$(curl -vI https://google.com --stderr - | grep "expire date" | cut -d":" -f 2-)
if [[ $(date -d "now + 15 days" ) < $expire_date ]]
    then echo "Pass"
else
    echo "Fail"
fi

