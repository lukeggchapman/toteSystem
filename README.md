# toteSystem
[![Build Status](https://travis-ci.org/lukeggchapman/toteSystem.svg?branch=master)](https://travis-ci.org/lukeggchapman/toteSystem)
[![Code Climate](https://codeclimate.com/github/lukeggchapman/toteSystem/badges/gpa.svg)](https://codeclimate.com/github/lukeggchapman/toteSystem)
[![Test Coverage](https://codeclimate.com/github/lukeggchapman/toteSystem/badges/coverage.svg)](https://codeclimate.com/github/lukeggchapman/toteSystem/coverage)

## To run example using stdin and stdout
Clone to local and cd toteSystem then run:
```
node run.js < data/input.txt
```
Node v0.10 recommeded

## Use programattically
```
var Tote = require ('./path/to/lib/tote.js');
var tote = new Tote(inputData);
var result = tote.getResult();
```

## Tests
### linting
```
npm run lint
```
### Mocha & chai tests
```
npm test
```
### Generate coverage files
```
npm run coverage
```
