/* globals module, require */

var _ = require('lodash');
var requireDir = require('require-dir');
var products = requireDir('products');

module.exports = (function () {

    /**
     * Constructor. Reads in data and builds product pools, then writes data out
     * @param   {String}     input             tote input data in format <product>:<selections>:<stake>
     * @param   {function}   resultCallback    Callback that is traiggered when the results are ready
     * @param   {JSON}       config            instance specific config overrides
     * @returns {toteSystem}                   instance of ToteSystem
     */
    function ToteSystem (input, resultCallback, config) {
        if (typeof input !== 'string') {
            throw 'ToteSystem input must be a string';
        }

        if (typeof resultCallback !== 'function') {
            throw 'ToteSystem requires a callback function';
        }

        if (typeof config !== 'undefined' && typeof config !== 'object') {
            throw 'ToteSystem config must be a object';
        }

        // sets instance config, overrides default if config is passed
        this.config = _.merge(require('../config/config.json'), config);
        this.resultCallback = resultCallback;
        this.products = this.createProducts();

        input.split('\n').forEach(_.bind(this.processInputLine, this));
    }

    ToteSystem.prototype.createProducts = function () {
        var result = {};
        var product;

        // Instanciates each product and sets equivilent config
        _.each(products, function (Product) {
            product = new Product();
            product.setConfig(this.config[product.name]);
            result[product.symbol] = product;
        }, this);

        return result;
    };

    ToteSystem.prototype.processInputLine = function (line, lineIndex) {
        var data = line.split(':');
        var product;

        if (data.length !== 4) {
            throw 'Incorrect data on line ' + lineIndex;
        }

        if (data[0] === 'Bet') {
            product = this.products[data[1]];
            if (!product) {
                throw 'Unknown product symbol ' + data[1] + ' on line ' + lineIndex;
            }

            product.addBet(data[2], data[3]);
        } else if (data[0] === 'Result') {
            for (var i = 1; i < data.length; i++) {
                if (isNaN(parseInt(data[i], 10))) {
                    throw 'Result format error';
                }
            }

            this.resultCallback(this.getResult(data.slice(1)));
        }
    };

    ToteSystem.prototype.getResult = function (result) {
        var output = '';
        _.each(this.products, function (product) {
            output += product.getResult(result);
        });
        return output;
    };

    return ToteSystem;
}());
