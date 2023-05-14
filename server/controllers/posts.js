import Post from "../models/Post.js"
import User from "../models/User.js";

// CREATE

export const createPost = async (req, res) => {
    try{
        const {userId, description, picturePath} = req.bvody;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes : {},
            comments: []
        })
        await newPost.save();
        const post = await Post.find(); //find the post in order to return it
        res.satus(201).json(post); //201 created succesfully
    } catch (err) {
        res.status(409).json({message: err.message}) //409 error at creating
    }
}

// READ

export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find(); //find the post in order to return it
        res.satus(200).json(post); //200 succesful request
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const {userId} = req.params;
        const post = await Post.find({userId}); //find the post in order to return it
        res.satus(200).json(post); //200 succesful request
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}

// UPDATE

export const likePost = async (req, res) => {
    try{
        const {id} = req.params; //id comes from the query string
        const {userId} = req.body; //userId comes from the body of the request
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); //if userId exists, the post has been liked by that person
        
        if (isLiked) { //if the post is liked already by that user than means he is removing the like and viceversa
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate( //update that specific post
            id,
            {likes: post.likes},
            {new : true}
        )

        res.satus(200).json(updatedPost); //200 succesful request
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}