import React from "react";
import { Link } from "react-router-dom";
import RightIcon from "/icons/RightIcon.png"
const ProceedBtn = ({message, source, resultData}) => {
  return (
    <Link to={source} className="proceed__btn--link" state={{apiResult: resultData}}>
      <p>{message}</p>
      <img src={RightIcon} alt="" />
    </Link>
  );
};

export default ProceedBtn;
