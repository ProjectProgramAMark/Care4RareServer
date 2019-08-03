var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // votedPosts: [{
    //     _id: ObjectId,
    //     votetype: Number
    // }],
    // points: {
    //     type: Number,
    //     default: 10
    // }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
