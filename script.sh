#!/bin/bash

for server in `cat list`
do
	echo -e "\n\t${server}"
	echo -e "\t---------\n"
	ssh -n -o StrictHostKeyChecking=No -i sadad-it.pem ec2-user@${server} sudo yum update -y mysql-community-libs mysql mysql-server mysql-community-devel mysql-community-libs-compat
done


