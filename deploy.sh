#!/bin/bash

npm install
export PORT=3001
forever stopall
forever start app.js
forever list
curl localhost:3001/start
