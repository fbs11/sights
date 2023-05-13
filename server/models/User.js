import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            min: 2,
            max: 30,
        },
        lastName: {
            type: String,
            require: true,
            min: 2,
            max: 30,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            max: 30,
        },
        password: {
            type: String,
            require: true,
            min: 5,
            max: 30,
        },
        picturePath: {
            type: String,
            default: "",
            min: 2,
            max: 30,
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,

    }, {timestamps: true} //we get the exact date of when changes are made
);

const User = mongoose.model("User", UserSchema);

export default User;