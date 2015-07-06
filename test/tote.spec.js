/* globals describe, it */

var Tote   = require('../lib/tote');

describe('tote System', function () {
  it('throws errors on incorrect constructor params', function () {
    expect(function () {
      new Tote(1, function () {});
    }).to.throw('ToteSystem input must be a string');

    expect(function () {
      new Tote('test', function () {}, 1);
    }).to.throw('ToteSystem config must be a object');

    expect(function () {
      new Tote('test', 'test', 1);
    }).to.throw('ToteSystem requires a callback function');
  });

  it('overrides config with passed param on init', function () {
    var newCommission = 0.05;
    var tote = new Tote('test:1:2:3', function () {}, {
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
