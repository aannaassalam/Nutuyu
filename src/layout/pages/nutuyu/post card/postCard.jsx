import React, { useState } from "react";
import "./postCard.css";
import PerComment from "./per comment/perComment";
import profile from "../../../../assets/user-profile.png";
import moment from "moment";
import { useAuth } from "../../../hooks/useAuth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

export default function PostCard({ post }) {
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState("");
  const [reply_name, setReply_name] = useState("");
  const [replyId, setReplyId] = useState("");

  const user = useAuth().user;

  const postComment = () => {
    if (comment.trim().length > 0 && user) {
      if (replyId) {
        const modifiedComments = post.comments.map((com) => {
          if (com.id === replyId) {
            const prevReply = com.replies.slice(-1)[0];
            console.log(prevReply.id.indexOf("-"));
            const id =
              com.replies.length > 0
                ? parseInt(prevReply.id.substr(prevReply.id.indexOf("-") + 1)) +
                  1
                : 1;
            com.replies = [
              ...com.replies,
              {
                comment: comment,
                date: new Date(),
                id: `sub${replyId}-${id}`,
                user_id: user.uid,
                user_name: user.full_name,
              },
            ];
          }
          return com;
        });
        updateDoc(doc(getFirestore(), "#nutuyu", post.id), {
          comments: modifiedComments,
        })
          .then(() => setComment(""))
          .catch((err) => console.log(err));
      } else {
        updateDoc(doc(getFirestore(), "#nutuyu", post.id), {
          comments: [
            ...post.comments,
            {
              comment,
              date: new Date(),
              id: `com${
                post.comments.length > 0
                  ? parseInt(
                      post.comments[post.comments.length - 1].id.substr(3)
                    ) + 1
                  : 1
              }`,
              replies: [],
              user_id: user.uid,
              user_name: user.full_name,
            },
          ],
        })
          .then(() => setComment(""))
          .catch((err) => console.log(err));
      }
    }
  };

  const post_modal = () => {
    return (
      <div className="modal-backdrop">
        <div className="post_modal">
          <div className="image">
            <img src={post.image} alt="" />
          </div>
          <div className="comments-container">
            <div className="user">
              {/* <img src={profile} alt="" /> */}
              <p>John Doe</p>
              <div onClick={() => setModal(false)}>
                <i className="fa-solid fa-times"></i>
              </div>
            </div>
            <div className="comments">
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <PerComment
                    comment={comment}
                    key={comment.id}
                    post={post}
                    setReply_name={setReply_name}
                    setReplyId={setReplyId}
                  />
                ))
              ) : (
                <div className="no_comments">
                  <p>
                    <span>No comments available.</span>
                    <br /> <span>Be the first one to comment!</span>
                  </p>
                </div>
              )}
            </div>
            <div className="add-comment">
              {reply_name && (
                <i
                  className="fa-solid fa-times"
                  onClick={() => setReply_name("")}
                ></i>
              )}
              <input
                type="text"
                placeholder={
                  reply_name ? `Reply to @${reply_name}` : "Add a comment..."
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                onClick={postComment}
                disabled={comment.trim().length === 0}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="nutuyu-card" onClick={() => setModal(true)}>
        <img src={post.image} alt="" />
        <div className="date">
          <span>{moment(post.date.toDate()).fromNow()}</span>
        </div>
      </div>
      {modal && post_modal()}
    </>
  );
}
