import React from "react";
import "./rating.css";
import { Avatar, Rating } from "@mui/material";
import moment from "moment";
function RatingReview({ data }) {
  return (
    <div className="Rating">
      <h1>Ratings And Reviews</h1>
      {data.map((item, id) => (
        <div className="reviewCard">
          <div className="reviewDetails">
            <Avatar alt="User Profile" src="" />
            <div>
              <p>{item.user}</p>
              <span>{moment(item.date.toDate()).fromNow()}</span>
            </div>
          </div>
          <Rating name="hover-feedback" value={item.rateValue} readOnly />
          {item.review && <p>{item.review}</p>}
        </div>
      ))}
    </div>
  );
}

export default RatingReview;
