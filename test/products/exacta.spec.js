/* globals describe, it */

var Exacta = require('../../lib/products/exacta');
var exacta;

describe('Exacta Product', function () {
    beforeEach(function () {
        exacta = new Exacta();
    });
    it('validatesSelection', function () {
        expect(function() {exacta.validateSelection('test')}).to.throw('Exacta selection needs to be in the format "<number>,<number>"');
    });

    it('getResult gets string result', function () {
        var totalStakeStub = 10;
        var resultStub = 5;

        exacta.totalStake = totalStakeStub;
        exacta.calculateDividend = function (winningSelection, totalStake) {
            expect(winningSelection).to.equal('1,2');
            expect(totalStake).to.equal(totalStakeStub);
            return resultStub;
        };
        expect(exacta.getResult([1,2,3])).to.equal('Exacta:1,2:$' + resultStub + '\n');

    });
});
