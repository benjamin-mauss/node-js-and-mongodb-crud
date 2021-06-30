
const mongoose = require("mongoose")
const Employee = mongoose.model('employees', new mongoose.Schema(
    { 
        name: {
            type:String,
            required:true
        },
        dob:{ // data of birth
            type:Date,
            required:true
        },
        sector:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"sectors",
            required:true
        },
        position:{ // cargo
            type:mongoose.Schema.Types.ObjectId,
            ref:"positions",
            required:true
        },
        doc:{ // data of creation
            type:Date,
            default: Date.now()
        }
    }
));

module.exports = Employee