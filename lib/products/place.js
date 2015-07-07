/* globals module, require */

var Product = require('../product');

module.exports = (function () {

    function Place () {}

    Place.prototype = new Product();

    Place.prototype.name = 'Place';
    Place.prototype.symbol = 'P';

    Place.prototype.validateSelection = function (selection) {
        if (isNaN(parseInt(selection, 10))) {
            throw 'Place selection needs to be a number';
        }
    };

    Place.prototype.getResult = function () {
        if (this.result) {
            var winningSelection, dividend;
            var subTotalStake = this.totalStake / 3;
            var output = [];

            for (var i = 0; i < 3; i++) {
                winningSelection = this.result[i];
                dividend = this.calculateDividend(winningSelection, subTotalStake);
                output.push(this.name + ':' + winningSelection + ':$' + dividend);
            }

            return output.join('\n');
        } else {
            throw 'Race has not completed';
        }
    };


    return Place;
}());
