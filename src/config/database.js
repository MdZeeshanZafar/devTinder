const mongoose = require("mongoose");



const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ZeeDev:LrVKrY0HBh0eoVmB@namastenode.nxbrkym.mongodb.net/devTinder")
}


module.exports = connectDB
