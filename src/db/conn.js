// This file is linked with the mongodb port number and url
// whose mongoose will connect and sends the data to get added
// on the data baseModule.
const baseModule = require("hbs")
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/userRegistration", {
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`connection failed`)
})