var fs = require("fs");
var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');

//===== db connection =====

var config = {
    username: 'username',
    password: 'password',
    host: 'remoteServerAddress',
    port: 22,
    dstPort: 27017,
};

var server = tunnel(config, function (error, server) {
    if (error) {
        console.log("SSH connection error: " + error);
    }
    console.log('SSH ok');
    mongoose.connect('mongodb://127.0.0.1:27017/DB?authSource=admin', {
        auth: {
            user: 'username',
            password: 'secret'
        }
    });

    console.log('Connect ok');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log("DB connection successful");
        // console.log(server);
    });
    //   .then(() => console.log('DB connection successful'))
    //   .catch((error) => console.error.bind(console, 'DB connection error:'));
});