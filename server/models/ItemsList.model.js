const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemsList = new Schema({

    caption: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    listId: {
        type: Schema.Types.ObjectId, ref: 'TodoList'
    }

})


module.exports = mongoose.model('ItemsList', ItemsList);