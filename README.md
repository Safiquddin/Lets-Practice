# Unix_and_shell
This repo has many shell script scenarios 

## Assignments 

1. what is the difference between single and double quotes in echo command?
   echo 'Hello $USER'  # Output: Hello $USER
   echo "Hello $USER"  # Output: Hello <Your Username>
2. how create a shortcut for a function in unix?
   nano ~/.bashrc
   alias shortcut_name='command_or_function'
ex:- when i type in xyz then it should execute who, ls, pwd one after the other
3. search the files based on size ( hint use find command )
   find /path/to/search -type f -size +100k -size -1M
```
find /path/to/search -type f -exec du -h {} + | sort -rh | head -n 10
```
4. difference between running script as sh script_name & ./script_name
```
sh script_name: This command explicitly specifies that the script should be run using the Bourne shell (sh) as the interpreter. It doesn't rely on the script's shebang (#!/bin/sh) line if it has one. This means that even if the script has a different shebang, such as #!/bin/bash, running it with sh will use the Bourne shell.

./script_name: This command relies on the shebang line in the script to determine the interpreter. If the script has a shebang line like #!/bin/sh, it will be executed using the Bourne shell (/bin/sh). If it has a different shebang, like #!/bin/bash, it will be executed using the specified interpreter (e.g., Bash).
```
5. $*, $@ , $$, $?
 ```
$*: Represents all the command-line arguments as a single string. It treats all arguments as a single entity enclosed in double quotes, with spaces separating them.

$@: Represents all the command-line arguments as separate strings. It treats each argument as an individual item and preserves any spaces or special characters.

$$: Represents the process ID (PID) of the currently running shell or script. It's a unique identifier for the script or process.

$?: Represents the exit status of the last executed command. It is a numeric value that indicates whether the command succeeded (usually 0) or encountered an error (non-zero)
```
6. vi editor short cuts
  In Normal Mode (Navigation and Manipulation):
```
i or I: Enter insert mode (at the cursor or beginning of the line).
a or A: Enter insert mode (after the cursor or end of the line).
o or O: Open a new line below or above the current line and enter insert mode.
x: Delete the character under the cursor.
dd: Delete the current line.
yy: Copy (yank) the current line.
p: Paste the copied or deleted text after the cursor.
P: Paste the copied or deleted text before the cursor.
u: Undo the last change.
Ctrl + r: Redo the last undone change.
J: Join the current line with the line below.
yy or Y: Yank (copy) lines.
nG or :n or :n<Enter>: Move to line number 'n'.
%: Move to the matching parentheses, bracket, or brace.
0 (zero): Move to the beginning of the current line.
$: Move to the end of the current line.
w: Move forward one word.
b: Move backward one word.
G: Move to the end of the file.
:q: Quit vi.
:w: Save the file.
:wq or ZZ: Save and quit.
:q!: Quit without saving (force exit).
In Insert Mode (Text Input):

Esc: Return to normal mode.
Ctrl + c: Return to normal mode.
Ctrl + h, Ctrl + w, Ctrl + u, Ctrl + d, Ctrl + t, and others: Various control key combinations for editing.
In Command Mode (For Ex Commands):

:: Enter command mode.
:w filename: Save the file as "filename".
:q!: Quit without saving (force exit).
:wq or :x: Save and quit.
:e filename: Edit another file.
:r filename: Read the contents of "filename" into the current file.
:set number: Show line numbers.
:set nonumber: Hide line numbers.
:set syntax=on: Enable syntax highlighting.
:set syntax=off: Disable syntax highlighting.
```
8. need a script which returns "zero" if the supplied number ends with 0, print "five" if number ends with 5. else check whether given number is even or odd?
```
#!/bin/bash
# read -p "Enter a number: " number
# Read the input number from the user
echo -n "Enter a number: "
read number

# Check if the number ends with 0
if [[ $number =~ 0$ ]]; then
    echo "zero"
# Check if the number ends with 5
elif [[ $number =~ 5$ ]]; then
    echo "five"
# Check if the number is even
elif ((number % 2 == 0)); then
    echo "even"
# If none of the above conditions match, it's an odd number
else
    echo "odd"
fi
```
9. script to check whether given string is palindrome or not ( string has to sent has param ), if user doesnt send any param i need print a message saying please supply string for which i want check palindrome condition?
```
#!/bin/bash
# Check if the user provided a string as a parameter
if [ $# -eq 0 ]; then
    echo "Please supply a string to check for palindrome condition."
    exit 1
fi

# Function to check if a string is a palindrome
is_palindrome() {
    local input="$1"
    local reversed=""
    local length=${#input}

    # Reverse the input string
    for ((i = length - 1; i >= 0; i--)); do
        reversed="${reversed}${input:$i:1}"
    done

    # Compare the reversed string with the original string
    if [ "$input" = "$reversed" ]; then
        echo "The string is a palindrome."
    else
        echo "The string is not a palindrome."
    fi
}

# Call the function with the first argument (the user-supplied string)
is_palindrome "$1"
```
