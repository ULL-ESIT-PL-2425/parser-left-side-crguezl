#!/bin/bash
set -e
# Error if no argument is passed
if [ -z "$1" ]; then
  echo "Usage: $0 examples/<test-name>.js"
  exit 1
fi
# Extract the test name from the argument
TEST_NAME=$(basename $1 .js)
# Check if a file with the same name exists in the test folder packages/babel-parser/test/left-side/in/
if [ ! -f packages/babel-parser/test/left-side/in/${TEST_NAME}.js ]; then
  echo "The test file does not exist in the test folder packages/babel-parser/test/left-side/in/"
  exit 2
fi
# Check if a file with the same name exists in the test folder packages/babel-parser/test/left-side/out/
if [ ! -f packages/babel-parser/test/left-side/out/${TEST_NAME}.js ]; then
  echo "The compiled test file does not exist in the test folder packages/babel-parser/test/left-side/out/"
  exit 3
fi
# Check if a file with the same name exists in the test folder packages/babel-parser/test/left-side/exec_out/
if [ ! -f packages/babel-parser/test/left-side/exec_out/${TEST_NAME}.js ]; then
  echo "The output file does not exist in the test folder packages/babel-parser/test/left-side/exec_out/"
  exit 4
fi
echo TEST_NAME exist in the test folders packages/babel-parser/test/left-side/{in,out and exec_out}
