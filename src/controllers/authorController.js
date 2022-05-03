const authorModel= require("../models/authorModel")
const jwt = require("jsonwebtoken")
const { status } = require("express/lib/response")
const res = require("express/lib/response")
const createAuthor= async function (req, res) {
    try {
        let data = req.body
        
        if ( Object.keys(data).length != 0) {
            let savedData = await authorModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else res.status(400).send({ msg: "BAD REQUEST"})
    }
    catch (err) {
        
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

const loginAuthor=async function(req,res){
    try{
    let {email,password}=req.body
    let data=await authorModel.findOne({email:email,password:password})
    if(!data){
        res.status(404).send("Please provide valid email id and password")
    } 
    else{
        let token=jwt.sign({userId:data._id,batch:"uranium"},"Project1")
        res.status(200).send({msg:token})

    }
}
catch(err){
    res.status(500).send({msg:err.message})
}

}




// Authentication
// Add an authorisation implementation for the JWT token that validates the token before
//  every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code
// Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)
// Set the token, once validated, in the request - x-api-key
// Use a middleware for authentication purpose.


module.exports.createAuthor= createAuthor
module.exports.loginAuthor= loginAuthor
