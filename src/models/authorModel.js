const mongoose = require('mongoose');
const xyz=require("validator")

const authorSchema = new mongoose.Schema( {
    fname: {type:String, required:true},
     lname: {type:String, required:true},
    title: {type:String, required:true, enum:["Mr", "Mrs", "Miss"]},
    email: {type:String, required:true, validate: [xyz.isEmail, 'Please fill a valid email address']
    , unique:true}, 
     password: {type:String, required:true} 
     

}, { timestamps: true });


module.exports = mongoose.model('Author', authorSchema) //authors
