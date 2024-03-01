#!/bin/bash

MSG="$1"
if ! grep -qE "Fixed" "$MSG"; then
cat "$MSG"
echo "Your commit message must contain the word 'fixed'"
exit 1
fi
