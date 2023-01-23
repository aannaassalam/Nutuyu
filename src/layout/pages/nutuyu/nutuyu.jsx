import React, { useEffect, useState } from "react";
import "./nutuyu.css";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import PostCard from "./post card/postCard";
import { useLocation, useParams } from "react-router";
import { param } from "jquery";

export default function Nutuyu() {
  const [posts, setPosts] = useState([]);
  const [active, setactive] = useState({});
  const params = useParams();

  useEffect(() => {
    onSnapshot(collection(getFirestore(), "#nutuyu"), (snapshot) => {
      const posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
    });
  }, []);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const [queryId, setqueryId] = useState(query.get("id"));
  useEffect(() => {
    init();
  }, [posts]);
  const init = (id) => {
    // setqueryId(id, console.log(queryId));
    setactive(posts.find((item) => item.uniqueid === queryId));
  };
  console.log(active);
  return (
    <div className="nutuyu">
      <div className="breadCrumb">
        <a href="/">Home</a>
        {">"}
        <a href={`/nutuyu`}>#Nutuyu</a>
      </div>
      <h1 className="displayName">#Nutuyu</h1>
      <p>Look how good this looks on me...</p>
      <div className="posts">
        {posts?.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard
                post={post}
                key={post.uniqueid}
                inti={init}
                active={active}
              />
            ))}
          </>
        ) : (
          <h2>No Photos Available</h2>
        )}
      </div>
    </div>
  );
}
