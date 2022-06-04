#!/bin/bash
while [ "$CORRECT" != "y" ]
do 
read -p "Enter your name: " NAME
read -p "is $NAME correct? " CORRECT
done
