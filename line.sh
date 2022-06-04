 local line_number=0;

        grep -v ^# /etc/passwd | while read line

        do

                echo $line_number: $line

                ((line_number++))

        done