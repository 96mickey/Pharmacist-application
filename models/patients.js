var mongoose = require("mongoose");
var patientSchema = new mongoose.Schema({
    serialNumber: Number,
    beltnumber: String,
    name: String,
    age: Number,
    sex: String,
    patientType: String,
    address: String,
    opdType: String,
    created: {type: Date, default: Date},
    pharmacist: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});
module.exports = mongoose.model("Patient", patientSchema);