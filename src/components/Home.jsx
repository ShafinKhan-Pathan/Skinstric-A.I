import { Link } from "react-router-dom";
import LeftIcon from "/icons/LeftIcon.png";
import RightIcon from "/icons/RightIcon.png";
import { useMediaQuery } from "react-responsive";
import MagicBox from "./UI/MagicBox";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <section className="home__section">
      {/* <div className="home__left"></div> */}
      {isMobile ? (
        <>
          <MagicBox />
          <MagicBox isAnimated={true}/>

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
            <div className="home__info--wrapper--left">
              <p className="home__info--discoverai">Discover AI</p>
              <img className="home__info--icons" src={LeftIcon} alt="" />
            </div>
            <h1 className="home__info--h1">
              Sophisticated <span className="home__info--span">skincare</span>
            </h1>
            <div className="home__info--wrapper--right">
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
