const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const User = new Schema({

    user_name: {
        type: String,
        require: 'User name is required!'
    },
    email: {
        type: String,
        require: 'Email is required!'
    },
    password: {
        type: String,
        require: 'Password is required!'
    },
    listID: [{type: Schema.Types.ObjectId, ref: 'TodoList'}]
});


User.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
    
})


module.exports = mongoose.model('User', User);