import React, { useEffect, useState } from "react";
import "./nutuyu.css";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import PostCard from "./post card/postCard";

export default function Nutuyu() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(collection(getFirestore(), "#nutuyu"), (snapshot) => {
      const posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
    });
  }, []);

  return (
    <div className="nutuyu">
      <div className="breadCrumb">
        <a href="/">Home</a>
        {">"}
        <a href={`/products/sold`}>#Nutuyu</a>
      </div>
      <h1 className="displayName">#Nutuyu</h1>
      <p>Look how good this looks on me...</p>
      <div className="posts">
        {posts?.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </>
        ) : (
          <h2>No Photos Available</h2>
        )}
      </div>
    </div>
  );
}
