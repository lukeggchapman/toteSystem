/* globals describe, it */

var Product = require('../lib/product');
var product;

describe('Product super', function () {
    beforeEach(function () {
        product = new Product();
        product.name = productName = 'productTest';
        product.validateSelection = function () {};
    });

    describe('setConfig', function () {
        it('throws error with no config', function () {
            expect(function () {
                product.setConfig();
            }).to.throw('Config not set for product ' + productName);
        });

        it('throws error if there is no commission set', function () {
            expect(function () {
                product.setConfig({test: 'test'});
            }).to.throw(productName + ' config commission needs to be a number');
        })

        it('set commission to the instance', function () {
            var commission = 0.25;
            product.setConfig({
                commission: commission
            });

            expect(product.commission).to.equal(commission);
        })
    });

    describe('addBet', function () {
        it('throws error with invalid bet stake', function () {
            var stake = 'test';
            expect(function () {
                product.addBet('1', stake);
            }).to.throw('Invalid stake: ' + stake);
        });

        it('calls instance validationSelection', function () {
            var testSelection = '5';
            var isCalled = false;

            product.validateSelection = function (selection) {
                expect(selection).to.equal(testSelection);
                isCalled = true;
            }

            product.addBet(testSelection, '2');
            expect(isCalled).to.be.ok;
        });

        it('increments totalStake', function () {
            var selection = '1';
            var stake = '3';

            product.addBet(selection, stake);
            product.addBet(selection, stake);
            product.addBet(selection, stake);

            expect(product.totalStake).to.equal(3 * parseInt(stake, 10));
        });

        it('adds selections to their pools', function () {
            product.addBet('1', '3');
            product.addBet('1', '2');

            product.addBet('2', '1');
            product.addBet('2', '3');

            product.addBet('3', '7');
            product.addBet('3', '2');

            expect(product.selections['1']).to.equal(5);
            expect(product.selections['2']).to.equal(4);
            expect(product.selections['3']).to.equal(9);
        });
    });

    describe('calculateDividends', function () {
        it('Tabcorp Exacta test', function () {
            product.selections = {'1,2':99, '2,3':206, '1,3':203, '3,2':103};
            product.commission = 0.18;
            expect(product.calculateDividend('2,3', 611)).to.equal(2.43);
        });
        it('Tabcorp Place test', function () {
            var totalStake = 215.33333333333334;
            product.selections = {'1':89, '2':179, '3':149, '4':229};
            product.commission = 0.12

            expect(product.calculateDividend('2', totalStake)).to.equal(1.06);
            expect(product.calculateDividend('3', totalStake)).to.equal(1.27);
            expect(product.calculateDividend('1', totalStake)).to.equal(2.13);
        });
        it('Tabcorp Win test', function () {
            product.selections = {'1':61, '2':110, '3':90, '4':77};
            product.commission = 0.15;
            expect(product.calculateDividend('2', 338)).to.equal(2.61);
        });
    });
});
