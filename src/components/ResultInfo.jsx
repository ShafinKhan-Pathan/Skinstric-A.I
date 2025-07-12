import MagicBox from "./UI/MagicBox";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
const ResultInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.apiResult;
  if (!resultData) {
    <section style={{ textAlign: "center", padding: "50px" }}>
      <h1>No Data Found</h1>
      <p>Please start the analysis from the beginning.</p>
      <Link to="/result">Go Back</Link>
    </section>;
  }
  const navigateToSummary = () => {
    navigate("/summary", { state: { apiResult: resultData } });
  };
  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    let mySplitText = new SplitText(".animated__text", {
      type: "chars",
    });
    gsap.from(mySplitText.chars, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.1, 
      ease: "power3.out",})
    gsap.from(".option__box", {
      opacity: 0,
      x: 100,
      duration: 0.5,
      stagger: 0.3,
      ease: "power3.out",
      clearProps: "transform",
    });
    gsap.from(".animated__text--h4", {
      opacity: 0,
      x: 100,
      duration: 0.5,
      delay: 0.5,
      ease: "power3.out",
    })
  }, []);
  return (
    <section>
      <h1 className="animated__text">
        A.I. ANALYSIS
      </h1>
      <h4 className="animated__text--h4">A.I. HAS ESTIMATED THE FOLLOWING.</h4>
      <h4 className="animated__text--h4">
        FIX ESTIMATED INFORMATION IF NEEDED
      </h4>
      <MagicBox isAnimated={false} />
      <div className="option__wrapper">
        <div className="demographic option__box" onClick={navigateToSummary}>
          <div className="demographic__border"></div>
          <p>Demographic</p>
        </div>
        <div className="cosmetics option__box">
          <p>
            Cosmetics <br />
            Concerns
          </p>
        </div>
        <div className="weather option__box">
          <p>Weather</p>
        </div>
        <div className="skin__type option__box">
          <p>Skin Type</p>
        </div>
      </div>
      <BackBtn message="BACK" source="/result" />
      <ProceedBtn
        message="GET SUMMARY"
        source="/summary"
        resultData={resultData}
      />
    </section>
  );
};

export default ResultInfo;
