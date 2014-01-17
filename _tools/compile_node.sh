#!/bin/bash
output="nodejs_php.js"
echo "Starting to compile all Functions, it may take a minute or two"
echo "module.exports = { " > $output

for dir in `ls functions`;do
	for file in `ls functions/$dir`;do
		#sed  's/function\s\(.*\)(/\1: function(/g' functions/$dir/$file >> $output
		sed '0,/function/s/function\s\(.*\)(/\1: function(/g' functions/$dir/$file >> $output
		echo "," >> $output
	done
done
sed -i '$ d' $output
echo "} " >> $output
echo "Compiler Script by Tim Holum"
echo "nodejs Compatible file $output"
