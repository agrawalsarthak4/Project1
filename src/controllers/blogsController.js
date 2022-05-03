
const blogsModel = require("../models/blogsModel")
const authorModel=require("../models/authorModel")
const { query } = require("express")
const res = require("express/lib/response")



const createBlogs = async function (req, res) {
    try {
        let data = req.body
        let author=data.authorId
        if(!author){
            res.status(404).send("Author is not present")
        }
        let authorID=authorModel.findById(author)
        if(!authorID){
            req.status(404).send("Please provide valid author id")
            
        }
        if ( Object.keys(data).length != 0) {
            let savedData = await blogsModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else res.status(400).send({ msg: "BAD REQUEST"})
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}



    const getBlogs=async function(req,res){
        try{
            let data=req.query 
            let data1=await blogsModel.find({$and:[data,{isDeleted:false},{isPublished:true}]})
            if(data1.length===0){
                return res.status(404).send({msg:"Not Found"})
            }
            else{
                return res.status(200).send({msg:data1})
            }
        }
        catch(err){
            res.status(500).send({msg:err.message})
        }

    }

    const updateBlogs=async function(req,res){
        try{
        
            let id=req.params.blogId 
            let data=await blogsModel.findById(id)
    
            if(!data){
                return res.status(400).send({msg:"blog not present"})
            }
            const updateBlog=await blogsModel.findOne({_id:id,isDeleted:false})
            console.log(updateBlog)
            if(!updateBlog){
                return res.status(404).send({msg:"Not Found"})
    
            }
            
            if(updateBlog.isPublished===true){
                return res.status(400).send({msg:"already published"})
            }
            if(req.body.title){
                updateBlog.title=req.body.title
            }
            if(req.body.body){
                updateBlog.body=req.body.body
            }
            
            if(req.body.tags){
                let value=req.body.tags
                
                let update1=updateBlog.tags
                
                update1.push(value)
                
                updateBlog.tags=update1 
                
            }
        
            if(req.body.subcategory){
                let value=req.body.subcategory
                let update2=updateBlog.subcategory
                update2.push(value)
                updateBlog.subcategory=update2 
            }
            
            let date=new Date()
            updateBlog.isPublished=true
            updateBlog.publishedAt=`${date}`
            updateBlog.save()
            console.log(567)
            res.status(200).send({msg:updateBlog})
    
        }
        catch(err){
            res.status(500).send({msg:err.message})
        }
    }
    
                  

    const deleteId=async function(req,res){
        try{
        
        let data=req.params.blogId
        
        let date=new Date()
        let blogid=await blogsModel.findById(data)
        if(!blogid){
            return res.status(404).send({msg:"Blog id doesnot exist"})
        }
        
        else if(blogid.isDeleted===false){
            let savedData=await blogsModel.findOneAndUpdate({_id:blogid._id},
                {$set:{isDeleted:true,deletedAt:`${date}`}},{new:true})
            return res.status(200).send({})    
        }
        else{
            return res.status(404).send("Not Found")
        }
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
            
    }    
        

const deleteByQuery=async function(req,res){
    try{
    let date=new Date()
    const data=await blogsModel.find(req.query)
    if(!data){
        res.status(404).send("Not Found")
    }
    else{
        for(let i=0;i<data.length;i++){
            if(data[i].isDeleted==false){
            await blogsModel.findOneAndUpdate({_id:data[i]._id},{$set:{isDeleted:true,deletedAt:`${date}`}})
                
        res.status(200).send({})}
        res.status(404).send("Not Found")

}}
}
catch(err){
    res.status(500).send({msg:err.message})
}}

// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like this

module.exports.createBlogs = createBlogs
module.exports.getBlogs=getBlogs
module.exports.updateBlogs=updateBlogs
module.exports.deleteId=deleteId
module.exports.deleteByQuery=deleteByQuery

