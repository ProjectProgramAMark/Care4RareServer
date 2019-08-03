var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var boardPostSchema = new Schema({
    title:   {type: String, required: true},
    content: {type: String, required: true},
    userId:  {type: String, required: true},
    votes:   {type: Number, default: 0},
    posted:  {type: Date, default: Date.now},
    postedBy: {type: String, ref: 'User'}
});

var BoardPost = mongoose.model('BoardPost', boardPostSchema);

module.exports = BoardPost;
