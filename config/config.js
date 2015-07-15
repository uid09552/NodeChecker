/**
 * Created by Max on 10.06.15.
 */

var conf;
var port = process.env.PORT || 3001;
conf = {
    'secret': 'mysecretpasswordtoverifyjsontokens',
    'mongodb': 'mongodb://node:Siemens12345!@dbh62.mongolab.com:27627/nodechecker',
    'port': port
};

module.exports = conf;