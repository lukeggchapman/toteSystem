/* globals describe, it */

var Place = require('../../lib/products/place');
var place;

describe('Place Product', function () {
    beforeEach(function () {
        place = new Place();
    });
    it('validatesSelection', function () {
        expect(function() {place.validateSelection('test')}).to.throw('Place selection needs to be a number');
    });

    it.skip('getResult gets string result', function () {
        var totalStakeStub = 9;
        var resultStub = 5;

        place.totalStake = totalStakeStub;
        place.calculateDividend = function (winningSelection, totalStake) {
            expect(winningSelection).to.equal('1');
            expect(totalStake).to.equal(totalStakeStub);
            return resultStub;
        };
        expect(place.getResult([1,2,3])).to.equal('Place:1,2:$' + resultStub + '\n');

    });
});
