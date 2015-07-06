/* globals module, require */

var _ = require('lodash');

module.exports = (function () {

    function Product () {
        this.totalStake = 0;
        this.selections = {};
    }

    Product.prototype.setConfig = function (config) {
        if (!(typeof config === 'object')) {
            throw 'Config not set for product ' + this.name;
        }
        if (!(typeof config.commission === 'number')) {
            throw this.name + ' config commission needs to be a number';
        }

        this.commission = config.commission;
    };

    Product.prototype.addBet = function (selection, stake) {
        var stakeInt = parseInt(stake, 10);

        if (isNaN(stakeInt)) {
            throw 'Invalid stake ' + stake;
        }

        this.validateSelection(selection);

        this.totalStake += stakeInt;
        this.selections[selection] = this.selections[selection] || 0;
        this.selections[selection] += stakeInt;
    };

    Product.prototype.calculateDividend = function (winningSelection, totalStake) {
        var winningStake = this.selections[winningSelection];
        return _.round(totalStake * (1 - this.commission) / winningStake, 2);
    };

    return Product;
}());
