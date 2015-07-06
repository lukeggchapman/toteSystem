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

    Place.prototype.getResult = function (result) {
        var winningSelection, dividend;
        var subTotalStake = this.totalStake / 3;
        var output = '';

        for (var i = 0; i < 3; i++) {
            winningSelection = result[i];
            dividend = this.calculateDividend(winningSelection, subTotalStake);
            output += this.name + ':' + winningSelection + ':$' + dividend + '\n';
        }

        return output;
    };


    return Place;
}());
