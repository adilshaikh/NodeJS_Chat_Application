const moment = require('moment');

var date = new moment();

console.log(date.format('MMM-Do-YYYY '))
date.subtract(8, 'HH')
console.log(date.format('HH:mm:ss A'))