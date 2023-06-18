import { createSlice } from "@reduxjs/toolkit";

// LOGIC

const initialState = { //grab all data of the app without passing in state and properties in different components
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice ({
    name: "auth",
    initialState,
    reducers: { //functions
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends does not exist")
            }
        },
        setPosts: (state,action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => { //run through all posts and return the want that matches
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }

})

export const {setMode,setLogin,setLogout,setFriends,setPost,setPosts} = authSlice.actions;
export default  authSlice.reducer;