const mongoose = require('mongoose');

const MernSchema = new mongoose.Schema({
    form:{type:String, required:true},
    name:{type:String, required:true},
    artist:{type:String},
    year:{type:Number},
    image:{type:String}
});

const Model = mongoose.model("Mern", MernSchema);

module.exports = Model;