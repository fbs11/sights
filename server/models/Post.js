import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean, //check if the user id exists
        },
        comments: {
            type: Array,
            default: [],
        }

    }, {timestamps: true} //we get the exact date of when changes are made
);

const Post = mongoose.model("Post", PostSchema);

export default Post;