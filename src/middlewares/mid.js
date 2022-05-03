// const blogsModel = require("../models/blogsModel")
let jwt = require("jsonwebtoken")
const blogsModel = require("../models/blogsModel")

const authenticate=async function(req,res,next){
    try{
        console.log(4);
        let token = req.headers["x-api-key"]
        
        if(!token) return res.send({msg:"Token is required"})
        
        let decodedToken = jwt.verify(token, 'Project1')
        
        if(decodedToken){
            
            next()
        }
        


    }

catch(err){
    return res.status(500).send({msg:err.message})
}


}


const authorise1 = async(req,res,next)=>{

    try{
        console.log(5);

    let token=req.headers["x-api-key"]
    let decodedToken=jwt.verify(token,"Project1")
    let blogId = req.params.blogId              //put , delete
    let queryAuthor  = req.query.authorId       //get ,delete
    
    let data1=decodedToken.userId
    let authorID=req.body.authorId
    console.log(authorID)
    if(authorID){
        if(data1==authorID){
            console.log(6);

                next()
    }
 else{
            return res.status(403).send({msg:"cannot access other's account"})
       }
    }
           
    else if (blogId){
    let data2= await blogsModel.findById(blogId)
    let xyz= data2.authorId
    if (xyz)
    {
        next()

    }
   else return res.status(403).send({msg:"cannot access other's account"})

    }
else if (queryAuthor){
         next()
}
          else  return res.status(403).send({msg:"cannot access other's account"})
      }
    


catch (err){
    return res.status(500).send({msg:err.message})
}
}






// Authentication
// Add an authorisation implementation for the JWT token that validates the token before
//  every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code
// Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)
// Set the token, once validated, in the request - x-api-key
// Use a middleware for authentication purpose.
 module.exports.authenticate = authenticate
 module.exports.authorise1 = authorise1