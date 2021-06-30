
const mongoose = require("mongoose")
const Sector = mongoose.model('sectors', new mongoose.Schema(
    { 
        name: {
            type:String,
            required:true
        },
        doc: {
            type:Date,
            default: Date.now()
        }
    }
));

module.exports = Sector
