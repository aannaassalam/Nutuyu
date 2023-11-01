import React, { useState } from "react";
import "./perComment.css";
import profile from "../../../../../assets/user-profile.png";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import moment from "moment";

export default function PerComment({
  comment,
  post,
  setReply_name,
  setReplyId,
}) {
  const [replies, setReplies] = useState(false);

  const actions = (replies_action, date) => {
    return (
      <div className="actions">
        <span
          onClick={() => {
            // setDelete_modal(true);
            // replyId && setReplyId(replyId);
            setReply_name(comment.user_name);
            setReplyId(comment.id);
          }}
        >
          Reply
        </span>
        {replies_action && (
          <span onClick={() => setReplies(!replies)}>
            {replies ? "Hide" : "View"} replies
          </span>
        )}
        <span>{moment(date).fromNow()}</span>
      </div>
    );
  };

  return (
    <div className="per_comment">
      {/* <div className="user-image">
        <img src={profile} alt="" />
      </div> */}
      <div className="comment">
        <span className="comment_text">
          <span className="username">{comment.user_name}</span>
          {comment.comment}
        </span>
        {actions(comment.replies.length > 0, comment.date.toDate())}
        {replies && (
          <div className="replies">
            {comment.replies.map((reply) => {
              return (
                <div
                  style={{ display: "flex", padding: "0 15px" }}
                  key={reply.id}
                >
                  {/* <div className="user-image">
                    <img src={profile} alt="" />
                  </div> */}
                  <div className="comment">
                    <span className="comment_text">
                      <span className="username">{reply.user_name}</span>
                      {reply.comment}
                    </span>
                    {actions(false, reply.date.toDate())}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
