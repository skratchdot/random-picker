# random-picker

[![NPM version](https://badge.fury.io/js/random-picker.svg)](http://badge.fury.io/js/random-picker)
[![Build Status](https://travis-ci.org/skratchdot/random-picker.png?branch=master)](https://travis-ci.org/skratchdot/random-picker)
[![Code Climate](https://codeclimate.com/github/skratchdot/random-picker.png)](https://codeclimate.com/github/skratchdot/random-picker)
[![Coverage Status](https://coveralls.io/repos/skratchdot/random-picker/badge.svg?branch=master&service=github)](https://coveralls.io/github/skratchdot/random-picker?branch=master)
[![Dependency Status](https://david-dm.org/skratchdot/random-picker.svg)](https://david-dm.org/skratchdot/random-picker)
[![devDependency Status](https://david-dm.org/skratchdot/random-picker/dev-status.svg)](https://david-dm.org/skratchdot/random-picker#info=devDependencies)

[![NPM](https://nodei.co/npm/random-picker.png)](https://npmjs.org/package/random-picker)


## Description

Randomly pick an item from a set (using the specified probabilities).


## Getting Started

Install the module with: `npm install random-picker`

```javascript
var Picker = require('random-picker').Picker;
var picker = new Picker(); // or pass in a seed: var picker = new Picker(seed)
picker.option('male');
picker.option('female');
picker.pick(); // 50% chance of being 'male' or 'female'
picker.option('male', 22);
picker.option('female', 78);
picker.pick(); // now there's a 22% chance of being 'male', and a 78% change of being 'female'
picker.removeAll();
picker.option('good', 3.42)
picker.option('bad', 3.42)
picker.pick(); // now there's a 50% chance of being 'good' or 'bad'
```

- [Live example on Tonic](https://tonicdev.com/npm/random-picker)


## Documentation

#### pick()

Randomly pick an item from the options that were added. The probability of an
item being chosen is determined by the score that was given to the option.

#### option(value, score)

Add an item to the list of available options that can be picked.  A default
score of 1 is used if the score is not passed in.

#### removeAll()

Remove all the options that have been passed in.

#### remove(value)

Remove the given option if it exists.

#### size()

Return how many options have been passed in.

#### totalScore()

What is the total score of the existing options?

#### avgScore()

What is the average score of the existing options?


## Examples

Initialize a picker with a given seed:
```javascript
var picker = require('random-picker').Picker('Seed my random generator');
```

A random score of 1 is used by default:
```javascript
// if male/female are the only options, then the following:
picker.option('male');
picker.option('female');
// is the same as:
picker.option('male', 1);
picker.option('female', 1);
// or for that matter:
picker.option('male', 100);
picker.option('female', 100);
```

You can pass in functions as well. The following code will return
a random number 80% of the time, and 0.5 20% of the time:
```javascript
picker.option(function () {
	return Math.random();
}, 80);
picker.option(function () {
	return 0.5;
}, 20);
console.log(picker.pick()());
```


## Release History

#### Version 0.1.0 (Released June 4, 2014)

- initial release


## License
Copyright (c) 2014 skratchdot  
Licensed under the MIT license.
