var chai       = require('chai');
var requireDir = require('require-dir');
var path       = require('path');
var fs         = require('fs');

// Setting these globally so we don't need to require chai every test
GLOBAL.expect     = chai.expect;
GLOBAL.assert     = chai.assert;

// Allowing txt data files to be read as strings
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// require all <lib> code to get full code coverage
// (even if a file doesn't have tests)
requireDir(path.join(__dirname, '../lib'), {recurse: true, duplicates: true});
