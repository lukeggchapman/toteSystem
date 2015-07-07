/* globals describe, it */

var Win = require('../../lib/products/win');
var win;

describe('Win Product', function () {
    beforeEach(function () {
        win = new Win();
    });
    it('validatesSelection', function () {
        expect(function() {
            win.validateSelection('test');
        }).to.throw('Win selection needs to be a number');

        expect(function() {
            win.validateSelection('1');
        }).to.not.throw();
    });

    it('getResult throws error if race not over', function () {
        expect(function() {win.getResult()}).to.throw('Race has not completed');
    });

    it('getResult gets string result', function () {
        var totalStakeStub = 10;
        var dividendStub = 5;
        var result = ['1','2','3'];

        win.totalStake = totalStakeStub;
        win.calculateDividend = function (winningSelection, totalStake) {
            expect(winningSelection).to.equal('1');
            expect(totalStake).to.equal(totalStakeStub);
            return dividendStub;
        };
        win.setResult(result);
        expect(win.getResult()).to.equal('Win:1:$' + dividendStub);

    });
});
