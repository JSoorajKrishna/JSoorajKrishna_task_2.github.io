const { timeStamp } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    clicked: Number,
    shortenedUrl: {
        type: String,
        required: true 
    }
},timeStamp);

const totusers = new Schema({
    total_users: String
});

const URL = mongoose.model("url",urlSchema);
const user = mongoose.model("user", totusers);

module.exports = {URL,user};