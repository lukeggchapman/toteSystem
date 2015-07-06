/* globals module, require */

var _ = require('lodash');

module.exports = (function () {

    /**
     * Constructor. Reads in data and builds product pools, then writes data out
     * @param   {String}     input   tote input data in format <product>:<selections>:<stake>
     * @param   {JSON}       config  instance specific config overrides
     * @returns {toteSystem}         instance of ToteSystem
     */
    function ToteSystem (input, config) {
        if (typeof input !== 'string') {
            throw 'ToteSystem input must be a string';
        }

        if (typeof config !== 'undefined' && typeof config !== 'object') {
            throw 'ToteSystem config must be a object';
        }

        // sets instance config, overrides default if config is passed
        this.config = _.merge(require('../config/config.json'), config);
    }

    return ToteSystem;
}());
