#!/bin/bash
echo "wait command" &
process_id=$!
wait $process_id
echo "executed with status $?"
