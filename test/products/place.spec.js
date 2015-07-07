/* globals describe, it */

var Place = require('../../lib/products/place');
var place;

describe('Place Product', function () {
    beforeEach(function () {
        place = new Place();
    });
    it('validatesSelection', function () {
        expect(function() {
            place.validateSelection('test');
        }).to.throw('Place selection needs to be a number');

        expect(function() {
            place.validateSelection('2');
        }).to.not.throw();
    });

    it('getResult throws error if race not over', function () {
        expect(function() {place.getResult()}).to.throw('Race has not completed');
    });

    it('getResult gets string result', function () {
        var totalStakeStub = 9;
        var dividendStub = 5;
        var result = ['1', '2', '3'];
        var index = 0;

        place.totalStake = totalStakeStub;
        place.calculateDividend = function (winningSelection, totalStake) {
            expect(winningSelection).to.equal(result[index]);
            expect(totalStake).to.equal(totalStakeStub / 3);
            index++;
            return dividendStub;
        };
        place.setResult(result);
        expect(place.getResult()).to.equal('Place:1:$' + dividendStub + '\nPlace:2:$' + dividendStub + '\nPlace:3:$' + dividendStub);

    });
});
