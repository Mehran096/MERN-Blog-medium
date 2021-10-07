const express = require('express');
const { createPost, fetchPosts, fetchPost, updatePost, updateValidation, updateImagePost, deletePost, homePost, detailPost,  commnetControl, deleteComment } = require('../controllers/postController');
const router = express.Router();
const auth = require('../utils/auth');
//post  
router.post('/create_post', auth, createPost);
//update post
router.post('/update', [auth, updateValidation], updatePost);
//update image
router.post('/updateImage', auth, updateImagePost)
//get posts
router.get('/posts/:id/:page', auth, fetchPosts);
//get post
router.get('/post/:id', auth, fetchPost);
//delete Post
router.get('/delete/:id', auth, deletePost);
//Home Post
router.get('/home/:page', homePost);
//details home post
router.get('/explore/:id', detailPost);
//comment
router.post('/comment', commnetControl)
//delete Comment
router.get('/deleter/:id',  deleteComment);

module.exports = router;