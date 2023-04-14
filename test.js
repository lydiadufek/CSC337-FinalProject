const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '123456789';
const someOtherPlaintextPassword = 'not_bacon';



bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    console.log("hash2 : "+ hash);
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
        // result == true
        console.log(result);
    });

});





// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         console.log("salt : "+salt);
//         console.log("hash : "+ hash);
//     });
// });
