import React from "react";
import { Link } from "react-router-dom";
import LeftIcon from "/icons/LeftIcon.png"
const BackBtn = ({message, source}) => {
  return (
    <Link to={source} className="back__btn--link">
      <img src={LeftIcon} alt="" />
      <p>{message}</p>
    </Link>
  );
};

export default BackBtn;
