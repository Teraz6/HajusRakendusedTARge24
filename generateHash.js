const bcrypt = require('bcrypt');
const myPassword = 'LammutajaRalf';

console.time('Time taken to generate salt');
const salt = bcrypt.genSaltSync(10);
console.log('This is your salt:' + salt);
console.timeEnd('Time taken to generate salt');

console.time('Time taken to generate hash');
const hashedPassword = bcrypt.hashSync(myPassword, salt);
console.log(myPassword + " is your password & this is hashedpassword: " + hashedPassword);