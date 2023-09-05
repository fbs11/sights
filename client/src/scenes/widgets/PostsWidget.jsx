import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json()
  
    let userPosts = {} // objeto de arrays donde ordenamos los posts segun usuarios
    
    data.forEach(element => {
      if (userPosts[element.userId] == undefined ) {
      userPosts[element.userId] = data.filter(e => element.userId == e.userId)
      }
    });

    dispatch(setPosts({ posts: recommendPosts(userPosts, await getFriends()) }));
  };

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data
    
  };

  const Pearson = (LikesA, LikesB) => { 
    const NumberLikes = LikesA.length 
    const SumA = LikesA.reduce((acc, n) => n + acc), SumB = LikesB.reduce((acc, n) => n + acc) 
    const SumSquareA = LikesA.reduce((acc, n) => acc + Math.pow(n, 2), 0), SumSquareB = LikesB.reduce((acc, n) => acc + Math.pow(n, 2), 0) 
    const SumProduct = LikesA.reduce((acc, n, i) => acc += LikesB[i] == undefined ? 0 : n * LikesB[i], 0) 

    const Numerator = (SumProduct - (SumA * SumB / NumberLikes)), Denominator = Math.sqrt((SumSquareA - Math.pow(SumA, 2) / NumberLikes) * (SumSquareB - Math.pow(SumB, 2) / NumberLikes))
    return !Denominator ? 0 : Numerator / Denominator
  }

  const recommendPosts = (userPosts, followers) => {
    const recommendations = []
    for (const [key, value] of Object.entries(userPosts)) {
      if (key !== userId) {
        const likesUser = userPosts[userId].map(p => Object.keys(p.likes).length)
        const likesOtherUser = value.map(p => Object.keys(p.likes).length)
        const correlation = Pearson(likesUser, likesOtherUser)
        console.log(correlation)
        
        if (correlation > 0) {
          const weight = followers.filter(f => f._id == key).length ? 1.5 : 1
          value.forEach(e => {
            e.correlation = weight * correlation
            recommendations.push(e)
          });
        } else {
          value.forEach(e => {
            e.correlation = 0
            recommendations.push(e)
          });
        }
      }
  }
  recommendations.sort((a,b) => b.correlation - a.correlation )
  return recommendations
}

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
