const User = require('../models/user.model.js');
const TodoLists = require('../models/todoList.model.js');


exports.createUser = async (req, res) => {

    const {user_name, email, password} = req.body;

    try {
        User.findOne({email}, function(err, user) {
            if (err) {
                return res.status(422).send(err);
            }

            if (user) {
                return res.status(422).send({
                    error: {
                        title: "Invalid email!", 
                        details: "User with this email is already exists!"
                    }
                });
            }

            const newUser = new User({
                user_name, 
                email, 
                password
            });
            console.log(newUser)
            
            newUser.save().then(() => {
                res.status(201).send(newUser);
            });
        });

    } catch (err) {
        res.status(400).send(err);
    }
}

