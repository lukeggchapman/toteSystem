/* globals module, require */

var Product = require('../product');

module.exports = (function () {

    function Win () {}

    Win.prototype = new Product();

    Win.prototype.name = 'Win';
    Win.prototype.symbol = 'W';

    Win.prototype.validateSelection = function (selection) {
        if (isNaN(parseInt(selection, 10))) {
            throw 'Win selection needs to be a number';
        }
    };

    Win.prototype.getResult = function (result) {
        var winningSelection = result[0];
        var dividend = this.calculateDividend(winningSelection, this.totalStake);
        return this.name + ':' + winningSelection + ':$' + dividend + '\n';
    };

    return Win;
}());
