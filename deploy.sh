#!/bin/sh

npm install
npm install forever -g
export PORT=3001
forever stopall
forever start app.js
echo 'forever started'
forever list


