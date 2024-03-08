const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoDB");

const todoSchema = mongoose.Schema({
    _id:{
        type: String,
        default: () => Math.random().toString(36).substr(2,9)
    },
    title: String,
    description: String
});

module.exports = mongoose.model("Todos", todoSchema);