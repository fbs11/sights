import express from "express";
import {getFeedPosts,getUserPosts,likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ

router.get("/", verifyToken, getFeedPosts); //take everypost from the database
router.get("/:userId/posts", verifyToken, getUserPosts); //only show that user posts

// UPDATE

router.patch("/:id/like", verifyToken, likePost); //like and unlike the post

export default router;