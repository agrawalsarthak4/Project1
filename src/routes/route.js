const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogsController= require("../controllers/blogsController")
const mid=require("../middlewares/mid")



router.post("/createAuthor", authorController.createAuthor)
router.post("/blogs",mid.authenticate,mid.authorise1,blogsController.createBlogs)
router.get("/blogs",mid.authenticate,mid.authorise1,blogsController.getBlogs)
router.put("/blogs/:blogId",mid.authenticate,mid.authorise1,blogsController.updateBlogs)
router.delete("/blogs/:blogId",mid.authenticate,mid.authorise1,blogsController.deleteId)
router.delete("/blogs",mid.authenticate,mid.authorise1,blogsController.deleteByQuery)
// loginAuthor
router.post("/loginAuthor", authorController.loginAuthor)





module.exports = router;