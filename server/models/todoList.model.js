const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


const TodoList = new Schema({
    // id: {
    //     type: Number
    // },
    caption: {
        type: String,
        require: "Caption is Required",
        max: [15, 'Caption too long! max is 15 characters']
    },
    description: {
        type: String,
        require: "Description is Required",
        max: [60, 'Description too long! max is 60 characters'],
        validate(value) {
            if (value < 10 ) {
                throw new Error('Description has to contain minimum of 10 words!')
            }
        }
    }, 
    image_url: {
        type: String,
        required: "Image_url is Required"
    }, 
    color: {
        type: String,
        required: "Color is Required"
    },
    itemID: [{
        type: Schema.Types.ObjectId, ref: 'ItemsList'
    }]
});

// const todolist = new TodoList({
//     id: 1,
//       caption: 'one',
//       description: 'test1 t t t t t t t t t',
//       image_url: 'event',
//       color: 'black',
// })

// todolist.save().then(() => {
//     console.log(todolist)
//     return res.json({'todolist saved': true});
// }).catch((error) => {
//     console.log('Error', error)
// })

module.exports = mongoose.model('TodoList', TodoList);