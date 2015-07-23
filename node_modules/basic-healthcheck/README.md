# basic-healthcheck
Very basic system healthcheck, good to start your app quickly.

Since it returns an object, it can be easily extended including more information about the status of your database, networks, etc. 

Here is a basic example:
```
var basicHC = require('basic-healthcheck')

var mystatus = basicHC.status(list_of_options)
```
the options being:

- memory: free memory in your server

- disk: free disk in your server

- node_version: quite clear right?


Full example:

```
var basicHC = require('basic-healthcheck')

var mystatus = basicHC.status([ 'memory', 'disk', 'node_version' ])
```
