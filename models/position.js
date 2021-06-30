
const mongoose = require("mongoose")
const Position = mongoose.model('positions', new mongoose.Schema( // cargo
    { 
        name: {
            type:String,
            required:true
        },
        salary:{
            type:Number,
            required:true
        }
            // salary
    }
));

module.exports = Position