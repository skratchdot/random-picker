'use strict';

var expect = require('chai').expect;
var Picker = require('./index').Picker;
var picker;
var pickerSeeded;
var seed = 'My random seed value!!!!';
var iterations = 1000;
var i;

describe('random-picker', function () {
	beforeEach(function () {
		picker = new Picker();
		pickerSeeded = new Picker(seed);
	});
	it('simple test', function () {
		picker.option('male');
		picker.option('female');
		for (i = 0; i < iterations; i++) {
			expect(['male', 'female'].indexOf(picker.pick())).to.be.within(0, 1);
		}
		picker.remove('female');
		for (i = 0; i < iterations; i++) {
			expect(picker.pick()).to.equal('male');
		}
	});
	it('no options', function () {
		expect(picker.pick()).to.be.null;
		expect(pickerSeeded.pick()).to.be.null;
	});
	it('seeded picker', function () {
		pickerSeeded.option('male');
		pickerSeeded.option('female');
		expect(pickerSeeded.pick()).to.equal('female');
		expect(pickerSeeded.pick()).to.equal('female');
		expect(pickerSeeded.pick()).to.equal('male');
		expect(pickerSeeded.pick()).to.equal('male');
		expect(pickerSeeded.pick()).to.equal('female');
		expect(pickerSeeded.pick()).to.equal('male');
	});
	it('removeAll()', function () {
		picker.option('male');
		picker.option('female');
		expect(['male', 'female'].indexOf(picker.pick())).to.be.within(0, 1);
		expect(function () {
			picker.removeAll();
		}).to.not.throw(Error);
		expect(picker.pick()).to.be.null;
	});
	it('size(), totalScore(), avgScore()', function () {
		expect(picker.avgScore()).to.equal(0);
		picker.option('male');
		picker.option('female');
		expect(picker.size()).to.equal(2);
		expect(picker.totalScore()).to.equal(2);
		expect(picker.avgScore()).to.equal(1);
		picker.option('male', 4);
		picker.option('female', 4);
		picker.option('uknown', 7);
		expect(picker.size()).to.equal(3);
		expect(picker.totalScore()).to.equal(15);
		expect(picker.avgScore()).to.equal(5);
	});
	it('option(name, value) should work', function () {
		picker.option('male', 10);
		picker.option('female', 10);
		for (i = 0; i < iterations; i++) {
			expect(['male', 'female'].indexOf(picker.pick())).to.be.within(0, 1);
		}
		picker.option('male', -1); // removes option
		for (i = 0; i < iterations; i++) {
			expect(picker.pick()).to.equal('female');
		}
	});
	it('should work with invalid option values', function () {
		picker.option('male', 'a');
		picker.option('female', 'b');
		for (i = 0; i < iterations; i++) {
			expect(['male', 'female'].indexOf(picker.pick())).to.be.within(0, 1);
		}
	});
	it('should work with zero as option value', function () {
		picker.option('male', 0);
		picker.option('female', 1);
		expect(picker.totalScore()).to.be.equal(1);
		for (i = 0; i < iterations; i++) {
			expect(['male', 'female'].indexOf(picker.pick())).to.be.equal(1);
		}
	});
});
