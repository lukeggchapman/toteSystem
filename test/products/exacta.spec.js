/* globals describe, it */

var Exacta = require('../../lib/products/exacta');
var exacta;

describe('Exacta Product', function () {
    beforeEach(function () {
        exacta = new Exacta();
    });

    it('validatesSelection', function () {
        expect(function() {
            exacta.validateSelection('test');
        }).to.throw('Exacta selection needs to be in the format "<number>,<number>"');

        expect(function() {
            exacta.validateSelection('1,2');
        }).to.not.throw();
    });

    it('getResult throws error if race not over', function () {
        expect(function() {exacta.getResult()}).to.throw('Race has not completed');
    });

    it('getResult gets string result', function () {
        var totalStakeStub = 10;
        var dividendStub = 5;
        var result = ['1','2','3'];

        exacta.totalStake = totalStakeStub;
        exacta.calculateDividend = function (winningSelection, totalStake) {
            expect(winningSelection).to.equal('1,2');
            expect(totalStake).to.equal(totalStakeStub);
            return dividendStub;
        };
        exacta.setResult(result);
        expect(exacta.getResult()).to.equal('Exacta:1,2:$' + dividendStub);

    });
});
