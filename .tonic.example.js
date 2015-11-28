var Picker = require('random-picker').Picker;
var picker = new Picker(); // or pass in a seed: var picker = new Picker(seed)
picker.option('male');
picker.option('female');
var r1 = picker.pick(); // 50% chance of being 'male' or 'female'
picker.option('male', 22);
picker.option('female', 78);
var r2 = picker.pick(); // now there's a 22% chance of being 'male', and a 78% change of being 'female'
picker.removeAll();
picker.option('good', 3.42);
picker.option('bad', 3.42);
var r3 = picker.pick(); // now there's a 50% chance of being 'good' or 'bad'
console.log(r1, r2, r3);
