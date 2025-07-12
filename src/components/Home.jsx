import { Link } from "react-router-dom";
import LeftIcon from "/icons/LeftIcon.png";
import RightIcon from "/icons/RightIcon.png";
import { useMediaQuery } from "react-responsive";
import MagicBox from "./UI/MagicBox";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  useGSAP(() => {
    gsap.fromTo(
      ".home__section",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, delay: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      ".home__info--h1",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, delay: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".home__info--message",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, delay: 1.1, ease: "power3.out" }
    );
  }, []);
  const handleMouseEnterLeft = () => {
    if (isMobile) return;
    gsap.set(".home__info--wrapper--right", {
      opacity: 0,
    });
    gsap.set(".home__right", {
      opacity: 0,
    });
    gsap.set(".home__info--h1", {
      x: "40%",
    });
  };
  const handleMouseLeaveLeft = () => {
    if (isMobile) return;

    gsap.set(".home__info--wrapper--right", {
      opacity: 1,
    });
    gsap.set(".home__right", {
      opacity: 1,
    });
    gsap.set(".home__info--h1", { x: "0%" });
  };

  const handleMouseEnterRight = () => {
    if (isMobile) return;
    gsap.set(".home__info--wrapper--left", {
      opacity: 0,
    });
    gsap.set(".home__left", { opacity: 0 });
    gsap.set(".home__info--h1", {
      x: "-40%",
    });
  };

  const handleMouseLeaveRight = () => {
    if (isMobile) return;
    gsap.set(".home__info--wrapper--left", {
      opacity: 1,
      ease: "power2.inOut",
    });
    gsap.set(".home__left", { opacity: 1 });
    gsap.set(".home__info--h1", { x: "0%" });
  };

  return (
    <section className="home__section">
      {isMobile ? (
        <>
          <MagicBox />
          <MagicBox isAnimated={true} />

          <div className="home__wrapper">
            <h1 className="home__info--h1">
              Sophisticated <span className="home__info--span">skincare</span>
            </h1>
            <div className="home__info--wrapper--right">
              <Link to="/testing" className="testing__link">
                <p className="home__info--taketest">ENTER EXPERIENCE</p>
                <img className="home__info--icons" src={RightIcon} alt="" />
              </Link>
            </div>
            <div className="home__info--message">
              <p>
                Skinstric developed an A.I. that creates a <br />{" "}
                highly-personalized routine tailored to <br />
                what your skin needs
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="home__left"></div>
          <div className="home__wrapper">
            <div
              className="home__info--wrapper--left"
              onMouseEnter={handleMouseEnterLeft}
              onMouseLeave={handleMouseLeaveLeft}
            >
              <p className="home__info--discoverai">Discover AI</p>
              <img className="home__info--icons" src={LeftIcon} alt="" />
            </div>
            <h1 className="home__info--h1">
              Sophisticated <span className="home__info--span">skincare</span>
            </h1>
            <div
              className="home__info--wrapper--right"
              onMouseEnter={handleMouseEnterRight}
              onMouseLeave={handleMouseLeaveRight}
            >
              <Link to="/testing" className="testing__link">
                <img className="home__info--icons" src={RightIcon} alt="" />
                <p className="home__info--taketest">TAKE TEST</p>
              </Link>
            </div>
            <div className="home__info--message">
              <p>
                Skinstric developed an A.I. that creates a <br />{" "}
                highly-personalized routine tailored to <br />
                what your skin needs
              </p>
            </div>
          </div>
          <div className="home__right"></div>
        </>
      )}
    </section>
  );
};

export default Home;
