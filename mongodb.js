async function connect (){
    const mongoose = require("mongoose")

    let result = await mongoose.connect('mongodb://localhost/crud', {useUnifiedTopology: true, useNewUrlParser: true}).catch(err => {
            console.log("Connection with MongoDB failed with error: " + err)
            process.exit()
    })
    console.log("Success connected with mongodb");
}
module.exports = connect


