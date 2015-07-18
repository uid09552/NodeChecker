var os = require('os')
var exec = require('child_process').execSync
var _ = require('lodash')

module.exports = (function() {

    var checks = {
        memory: function() {
            return Math.round((os.freemem() / os.totalmem()) * 100) + '%'
        },
        disk: function() {
            var free_disk = parseFloat(exec("df | grep / | awk '{ print $8 }'").toString().trim().split('\n')[0])
            return (100 - free_disk) + '%'
        },
        node_version: function() {
            return process.version
        }
    }

    function status(options) {
        var statusList = {}
        _.forEach(options, function(option) {
            if (checks[option]) statusList[option] = checks[option]()
        })
        return statusList
    }

    return {
        status: status
    }
})()