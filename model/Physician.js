var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var physicianMemberSchema = new Schema({
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
    },
    field: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    treatedrare: {
        type: Boolean,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    forumrec: {
        type: Boolean,
        required: true
    },
    patientsask: {
        type: Boolean,
        required: true
    }
});

var PhysicianMember = mongoose.model('PhysicianMember', physicianMemberSchema);

module.exports = PhysicianMember;
