#!/bin/sh

npm install
export PORT=3001
#forever stopall
#forever start app.js
echo 'forever started'
#forever list
node app.js
curl localhost:3001/start
