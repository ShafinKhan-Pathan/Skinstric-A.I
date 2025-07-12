import React from "react";
import { Link } from "react-router-dom";
import LeftIcon from "/icons/LeftIcon.png"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const BackBtn = ({message, source}) => {
  useGSAP(() => {
    gsap.fromTo(
      ".back__btn--link",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, delay: 0.5, ease: "power3.out" }
    );
  }, []);
  return (
    <Link to={source} className="back__btn--link">
      <img src={LeftIcon} alt="" />
      <p>{message}</p>
    </Link>
  );
};

export default BackBtn;
