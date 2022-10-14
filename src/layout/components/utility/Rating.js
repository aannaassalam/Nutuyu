import styled from "@emotion/styled";
import { Rating } from "@mui/material";
import React from "react";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#2a2a2a",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default StyledRating;
