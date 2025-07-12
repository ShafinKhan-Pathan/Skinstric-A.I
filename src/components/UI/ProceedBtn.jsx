import { Link } from "react-router-dom";
import RightIcon from "/icons/RightIcon.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const ProceedBtn = ({ message, source, resultData, onClick = () => {} }) => {
   useGSAP(() => {
    gsap.fromTo(
      ".proceed__btn--link",
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, delay: 0.5, ease: "power3.out" }
    );
  }, []);
  return (
    <Link
      to={source}
      className="proceed__btn--link"
      state={{ apiResult: resultData }}
      onClick={onClick}
    >
      <p>{message}</p>
      <img src={RightIcon} alt="" />
    </Link>
  );
};

export default ProceedBtn;
