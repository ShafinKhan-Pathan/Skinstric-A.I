import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MagicBox = ({ isAnimated, isHover }) => {
  useGSAP(() => {
    gsap.fromTo(
      ".magic__box",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="design__wrapper">
      <div
        className={`magic__box ${!isAnimated ? "no-animation" : ""} ${
          isHover ? "magic__box--hover" : ""
        }`}
      ></div>
    </div>
  );
};

export default MagicBox;
