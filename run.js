/* globals require */

var concat = require('concat-stream');
var Tote = require('./lib/tote');

// Simple read from stdin and write to stdout
process.stdin.setEncoding('utf8');
process.stdin.pipe(concat(function (data) {
    var tote = new Tote(data);
    debugger;
    process.stdout.write();
}));
