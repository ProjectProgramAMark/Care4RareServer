var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var familyMemberSchema = new Schema({
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
    patientRelationship: {
      type: String,
      required: true
    },
    careprovider: {
        type: Boolean,
        required: true
    },
    patientaccountp: {
      type: String,
      required: true
    },
    joinreason: {
      type: String,
      required: true
    },
    patientdisease: {
      type: String,
      required: true
    },
    patientdoctor: {
      type: String,
      required: true
    },
    diseaseduration: {
      type: String,
      required: true
    },
    diseasetreatment: {
      type: String,
      required: true
    },
    sharedata: {
      type: Boolean,
      required: true
    },
    forumrec: {
      type: Boolean,
      required: true
    },
    legalsave: {
      type: Boolean,
      required: true
    }
});
var FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);

module.exports = FamilyMember;
