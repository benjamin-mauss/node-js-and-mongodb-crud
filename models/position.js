
const mongoose = require("mongoose")
const Position = mongoose.model('positions', new mongoose.Schema( // ROLE
    { 
        name: {
            type:String,
            required:true
        },
        salary:{
            type:Number,
            required:true
        }
        
    }
));

module.exports = Position