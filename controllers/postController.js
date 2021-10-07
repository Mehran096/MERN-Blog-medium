const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Post = require("../models/Post");
const formidable = require('formidable');
const {body, validationResult} = require("express-validator");
const { htmlToText } = require('html-to-text');
const CommentSchema = require('../models/Comment');

//create post
module.exports.createPost = (req, res) => {
     const form = formidable({multiples: true});
     form.parse(req, async (error, fields, files) => {
         const {title, body, description, slug, id, name} = fields;
         const errors = [];
         if(title === ''){
             errors.push({msg: 'Title is required'})
         }
         if(body === ''){
             errors.push({msg: 'Body is required'})
         }
         if(description === ''){
             errors.push({msg: 'description is required'})
         }
         if(slug === ''){
             errors.push({msg: 'Slug is required'})
         }
         if(Object.keys(files).length === 0){
             errors.push({msg: 'image is required'})
         }else{
             const {type} = files.image;
             const split = type.split('/')[1];
             const extension = split.toLowerCase();
             if(extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg'){
                 errors.push({ msg: `${extension} is not a valid extension`})
             }else{
                files.image.name = uuidv4() + '.' + extension;
               
             }
         }
         const checkSlug = await Post.findOne({slug});
         if(checkSlug){
             errors.push({msg: "please choose a unique slug/URL"});
         }
         if(errors.length !== 0) {
             return res.status(400).json({errors, files})
         } else{
            const newPath = __dirname + `/../client/build/images/${files.image.name}`;
            fs.copyFile(files.image.path, newPath, async (error) => {
                if(!error){
                    try {
                        const response = await Post.create({
                            title,
                            body,
                            description,
                            slug,
                            image: files.image.name,
                            userName: name,
                            userId: id
                        });
                        return res.status(200).json({msg: 'Your post has been created Successfully', response})
                    } catch (error) {
                        return res.status(500).json({errors:error, msg: error.message});
                    }
                }
            })
         }
     })
};

//get posts controller
module.exports.fetchPosts = async (req, res) => {
    const id = req.params.id; 
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;

    try {
        const count = await Post.find({userId: id}).countDocuments();
        const response = await Post.find({userId: id}).skip(skip).limit(perPage).sort({updatedAt: -1})
        return res.status(200).json({response: response, count, perPage})
    } catch (error) {
        return res.status(500).json({errors:error, msg: error.message});
    }
}

//get post controller
module.exports.fetchPost = async (req, res) => {
        const id = req.params.id;
        try {
            const post = await Post.findOne({_id: id});
            return res.status(200).json({post});
        } catch (error) {
            return res.status(500).json({errors:error, msg: error.message});
        }
}

//update post validation
module.exports.updateValidation = [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('body')
    .notEmpty()
    .trim()
    .custom((value) => {
        let bodyValue = value.replace(/\n/g, '');
        if(htmlToText(bodyValue).trim().length === 0){
            return false
        }else{
            return true
        }
    }).withMessage('Body is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
];

//update post controller
module.exports.updatePost = async (req, res) => {
    const {title, body, description, id} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }else{

        try {
            const response = await Post.findByIdAndUpdate(id, {
                title,
                body,
                description
            });
            res.status(200).json({msg: 'Your post has been updated succcessfully'});
        } catch (error) {
            return res.status(500).json({errors:error, msg: error.message});
        }
    }
}

//update image controller
module.exports.updateImagePost = (req, res) => {
     const form = formidable({multiples: true});
     form.parse(req, (errors, fields, files) => {
         const {id} = fields;
        const ImageErrors = [];
        if(Object.keys(files).length === 0){
            ImageErrors.push({msg: 'Please Choose Image'})
        }else{
            const {type} = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'png' && extension !== 'jpeg' && extension !== 'jpg'){
                ImageErrors.push({msg: `${extension} is not a valid extension`})
            }else{
                files.image.name = uuidv4() + '.' + extension;
            }
        }
        if(ImageErrors.length !== 0){
            return res.status(400).json({errors: ImageErrors});
        }else{
            const newPath = __dirname + `/../client/build/images/${files.image.name}`;
            fs.copyFile(files.image.path, newPath, async (error) => {
                if(!error){
                    try {
                        const response = await Post.findByIdAndUpdate(id, {image: files.image.name});
                        return res.status(200).json({msg: 'Your Image has been Updated Succcessfully'});
                    } catch (error) {
                        return res.status(500).json({errors:error, msg: error.message});
                    }
                }
            })
        }
     })
}

//delete post controller
module.exports.deletePost = async (req, res) => {
    const id = req.params.id;
     try {
         const response = await Post.findByIdAndDelete(id);
         return res.status(200).json({msg: 'Your Post has been deleted successfully'})
     } catch (error) {
        return res.status(500).json({errors:error, msg: error.message});
     }
}

//homePost
module.exports.homePost = async (req, res) => {
    const page = req.params.page;
	const perPage = 3;
	const skip = (page - 1) * perPage;
	try {
		const count = await Post.find({}).countDocuments();
		const posts = await Post.find({})
			.skip(skip)
			.limit(perPage)
			.sort({ updatedAt: -1 });
		return res.status(200).json({ response: posts, count, perPage });
	} catch (error) {
		return res.status(500).json({ errors: error, msg: error.message });
	}
}

//details post
module.exports.detailPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findOne({slug: id});
        const comments = await CommentSchema.find({postId: post._id}).sort({updatedAt: -1})
        return res.status(200).json({post, comments});
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

//comment post
module.exports.commnetControl = async (req, res) => {
     const {id, comment, userName } = req.body

     try {
         const response = await CommentSchema.create({
             postId: id,
             comment,
             userName

         })
         return res.status(200).json({msg: 'Your Comment has been published'})
     } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
     }
}

//delete comment
module.exports.deleteComment = async (req, res) => {
    const id = req.params.id;
     try {
         const response = await CommentSchema.findByIdAndDelete(id);
         return res.status(200).json({msg: 'Your Comment has been deleted successfully'})
     } catch (error) {
        return res.status(501).json({errors:error, msg: error.message});
     }
}

// const id = req.params.id; 
//     const page = req.params.page;
//     const perPage = 3;
//     const skip = (page - 1) * perPage;

//     try {
//         const count = await Post.find({userId: id}).countDocuments();
//         const response = await Post.find({userId: id}).skip(skip).limit(perPage).sort({updatedAt: -1})
//         return res.status(200).json({response: response, count, perPage})
//     } catch (error) {
//         return res.status(500).json({errors:error, msg: error.message});
//     }