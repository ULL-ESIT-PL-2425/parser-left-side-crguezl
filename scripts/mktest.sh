#!/bin/bash
set -e
# Error if no argument is passed
if [ -z "$1" ]; then
  echo "Usage: $0 examples/<test-name>.js"
  exit 1
fi
# Extract the test name from the argument
TEST_NAME=$(basename $1 .js)
# Copy the test file to the test folder packages/babel-parser/test/left-side/in/
cp examples/${TEST_NAME}.js packages/babel-parser/test/left-side/in/
if [ $? -ne 0 ]; then
  exit 2
fi
# Compile the test file with babel 
(cd examples && npx babel $TEST_NAME.js --out-file ${TEST_NAME}.cjs) 
if [ $? -ne 0 ]; then
  exit 3
fi
# Copy the compiled test file to the test folder packages/babel-parser/test/left-side/out/
cp examples/${TEST_NAME}.cjs packages/babel-parser/test/left-side/out/${TEST_NAME}.js
if [ $? -ne 0 ]; then
  exit 4
fi
# Run the compiled file and redirect the output to the test folder packages/babel-parser/test/left-side/exec_out/
node packages/babel-parser/test/left-side/out/${TEST_NAME}.js > packages/babel-parser/test/left-side/exec_out/${TEST_NAME}.js
