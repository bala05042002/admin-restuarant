const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    price:Number,
    image:String,
    des:String,
    available:Boolean,
    type:String
});

const itemModel = mongoose.model('Items', itemSchema, "items");

module.exports = itemModel