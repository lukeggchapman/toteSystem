/* globals describe, it */

var Tote = require('../lib/tote');

describe('tote System', function () {
    describe('constructor', function () {
        it('throws errors on incorrect params', function () {
            expect(function () {
                new Tote(1, function () {});
            }).to.throw('ToteSystem input must be a string');

            expect(function () {
                new Tote('test', function () {}, 1);
            }).to.throw('ToteSystem config must be a object');

            expect(function () {
                new Tote('test', 'test', 1);
            }).to.throw('ToteSystem requires a callback function');
        });

        it('overrides config with config param', function () {
            var newCommission = 0.05;
            var tote = new Tote('test:1:2:3', function () {}, {
                'win': {
                    'commission': newCommission
                }
            });

            expect(tote.config.win.commission).to.equal(newCommission);
        });
    });

    describe('createProducts', function () {
        var requireDir = require('require-dir');
        var productObjects = requireDir('../lib/products');

        it('Instanciates products', function () {
            var tote = new Tote('Bet:W:1:2', function () {});
            var products = tote.createProducts();

            expect(products['W']).to.be.an.instanceof(productObjects.win);
            expect(products['P']).to.be.an.instanceof(productObjects.place);
            expect(products['E']).to.be.an.instanceof(productObjects.exacta);
        });
    });

    describe('processInputLine', function () {
        var inputLine, tote;

        beforeEach(function () {
            inputLine = 'Bet:W:1:2';
            tote = new Tote(inputLine, function () {});
        });

        it('throws error on short input', function () {
            expect(function () {
                tote.processInputLine('Bet:W:1', 0);
            }).to.throw('Incorrect data on line 1');
        });

        it('throws error if product doesn\'t exist', function () {
            expect(function () {
                tote.processInputLine('Bet:M:1:2', 0);
            }).to.throw('Unknown product symbol M on line 1')
        });

        it('places bet correctly', function () {
            var addBetCalled = false;

            tote.products = {
                'W': {
                    addBet: function (selection, stake) {
                        expect(selection).to.equal('1');
                        expect(stake).to.equal('2');
                        addBetCalled = true;
                    }
                }
            };

            tote.processInputLine(inputLine, 0);
            expect(addBetCalled).to.be.ok;
        });

        it('handles result correctly', function () {
            var tote;
            var callbackCalled = false;
            var resultsInput = 'Result:2:3:1';
            var resultsOutput = 'Testing results';
            var resultsCallback = function (string) {
                expect(string).to.equal(resultsOutput);
                callbackCalled = true;
            };
            tote = new Tote(inputLine, resultsCallback);

            tote.setResult = function (resultArray) {
                expect(resultArray).to.eql(['2', '3', '1']);
            };

            tote.getResult = function () {
                return resultsOutput;
            };

            tote.processInputLine(resultsInput, 0);

            expect(callbackCalled).to.be.ok;
        });
    });

    describe('setResult', function () {
        it('throws error on invalid result', function () {
            var tote = new Tote('Bet:W:1:2', function () {});
            expect(function () {
                tote.setResult(['Q', '3', '1']);
            }).to.throw('Result format error');
        });
    });

    describe('getResult', function () {
        it('builds output from each product', function () {
            var tote = new Tote('Bet:W:1:2', function () {});
            tote.products = {
                'W': {
                    getResult: function () {
                        return 'Win Result';
                    }
                },
                'P': {
                    getResult: function () {
                        return 'Place Result';
                    }
                },
                'E': {
                    getResult: function () {
                        return 'Exacta Result';
                    }
                }
            };
            expect(tote.getResult()).to.equal('Win Result\nPlace Result\nExacta Result');
        });
    });

    it('Full Tabcorp test', function () {
        var input = require('../data/input.txt');;
        var outputSplit = require('../data/output.txt').split('\n');
        var tote = new Tote(input);
        var resultSplit = tote.getResult().split('\n');

        console.log('resultSplit', resultSplit);
        console.log('outputSplit', outputSplit);

        expect(resultSplit).to.include.members(outputSplit);
        expect(resultSplit.length).to.equal(outputSplit.length);
    });
});
