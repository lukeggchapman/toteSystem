/* globals describe, it */

var stream = require('stream');
var concat = require('concat-stream');

var Tote   = require('../lib/tote');

describe('tote System', function () {
  it('throws errors on incorrect constructor params', function () {
    expect(function () {
      new Tote(1);
    }).to.throw('ToteSystem input must be a string');

    expect(function () {
      new Tote('test', 1);
    }).to.throw('ToteSystem config must be a object');
  });

  it('overrides config with passed param on init', function () {
    var newCommission = 0.05;
    var tote = new Tote('test', {
      'win': {
        'commission': newCommission
      }
    });

    expect(tote.config.win.commission).to.equal(newCommission);
  });

  it.skip('Full Tabcorp test', function (done) {
    var input = require('../data/input.txt');;
    var output = require('../data/output.txt');
    var tote = new Tote(input);

    expect(tote.getResult()).to.equal(output);
  });
});
