const { Router } = require("express");

const router = Router();

const asyncHandler = require("../middleware/asyncHandler");
const blogController = require("../controller/blog.controller");
const { isAuth } = require("../middleware/authMiddleware");
const filterQueries = require("../utils/filterQueries");

//! ---------------------- GET ROUTES ----------------------

//? Route and Method: /blog & GET
router.get("/", filterQueries, blogController.blog);

//? Route and Method: /blog/new & GET
router.get("/new", isAuth, blogController.addBlog);

router.get("/read/private/:blogId", isAuth, asyncHandler(blogController.getBlogInPrivateMode));

//? Route and Method: /read/:blogId & GET
router.get("/read/:blogId/:slug", asyncHandler(blogController.getBlog));

//? Route and Method: /blog/update/:blogId & GET
router.get("/update/:blogId", asyncHandler(blogController.updateBlog));

//? Route and Method: /blog/like/:blogId & GET
router.get("/like/:blogId", asyncHandler(blogController.likeBlog));

//! ---------------------- POST ROUTES ----------------------

//? Handle approve a blog.
router.post("/approve", asyncHandler(blogController.approveBlog));

//? Handle UnApprove a blog.
router.post("/unapprove", asyncHandler(blogController.unApproveBlog));

//? Route and Method: /blog/delete/:blogId & POST
router.post("/delete", asyncHandler(blogController.handleDeleteBlog));

//? Route and Method: /blog/new & POST
router.post("/new", isAuth, asyncHandler(blogController.handleAddBlog));

//? Route and Method: /blog/update & POST
router.post("/update", asyncHandler(blogController.handleUpdateBlog));

router.post("/image/upload", blogController.uploadImage);

module.exports = router;
