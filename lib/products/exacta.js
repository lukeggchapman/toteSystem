var Product = require('../product');

module.exports = (function () {

    function Exacta () {}

    Exacta.prototype = new Product();

    Exacta.prototype.name = 'Exacta';
    Exacta.prototype.symbol = 'E';

    Exacta.prototype.validateSelection = function (selection) {
        if (!/^\d,\d$/.test(selection)) {
            throw this.name + ' selection needs to be in the format "<number>,<number>"';
        }
    };

    Exacta.prototype.getResult = function (result) {
        var winningSelection = result[0] + ',' + result[1];
        var dividend = this.calculateDividend(winningSelection, this.totalStake);

        return this.name + ':' + winningSelection + ':$' + dividend + '\n';
    };


    return Exacta;
}());
