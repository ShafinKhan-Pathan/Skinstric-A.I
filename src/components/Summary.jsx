import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const findTopPrediction = (predictions) => {
  if (!predictions || Object.keys(predictions).length === 0) return;
  const predictedArray = Object.entries(predictions);
  predictedArray.sort((a, b) => b[1] - a[1]);
  return predictedArray[0][0];
};

const Summary = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  const resultData = location.state?.apiResult;
  const [activeCategory, setActiveCategory] = useState("race");
  if (!resultData || !resultData.data) {
    <section style={{ textAlign: "center", padding: "50px" }}>
      <h1>No Data Found</h1>
      <p>Please start the analysis from the beginning.</p>
      <Link to="/result">Go Back</Link>
    </section>;
  }
  const handleFinishProcess = () => {
    sessionStorage.removeItem("Previous Uploaded Image");
  };
  let dataDisplay = {};
  if (activeCategory === "race") {
    dataDisplay = resultData.data.race;
  } else if (activeCategory === "age") {
    dataDisplay = resultData.data.age;
  } else {
    dataDisplay = resultData.data.gender;
  }
  const sortedDisplayData = Object.entries(dataDisplay).sort(
    (a, b) => b[1] - a[1]
  );
  const topPrediction =
    sortedDisplayData.length > 0 ? sortedDisplayData[0] : ["NA"[0]];
  const percentageValue = Math.round(topPrediction[1] * 100);

  useGSAP(() => {
    gsap.from(".summary__heading--h4", {
      opacity: 0,
      x: 100,
      duration: 0.5,
      delay: 0.5,
      ease: "power3.out",
    });
    gsap.from(".summary__heading--para", {
      opacity: 0,
      x: 100,
      duration: 0.5,
      delay: 1,
      ease: "power3.out",
    });
    gsap.from(".box", {
      opacity: 0,
      x: 100,
      duration: 0.5,
      stagger: 0.3,
      ease: "power3.out",
      clearProps: "transform",
    });
    gsap.from(".summary__graphics, .summary__third", {
      opacity: 0,
      y: 50,
      duration: 0.5,
      delay: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);
  return (
    <section>
      <div className="summary__wrapper">
        <div className="summary__heading">
          <h4 className="summary__heading--h4">A.I. ANALYSIS</h4>
          <h1 className="summary__heading--h1 animated__text">DEMOGRAPHICS</h1>
          <p className="summary__heading--para">PREDICTED RACE & AGE</p>
        </div>
        <div className="summary__detail--wrapper">
          <div className="summary__first">
            <div
              onClick={() => setActiveCategory("race")}
              className={`race__box ${
                activeCategory === "race" ? "active" : ""
              } box`}
            >
              <p>{findTopPrediction(resultData.data.race).toUpperCase()}</p>
              <h1>RACE</h1>
            </div>
            <div
              onClick={() => setActiveCategory("age")}
              className={`age__box ${
                activeCategory === "age" ? "active" : ""
              } box`}
            >
              <p>Age</p>
              <h1>{findTopPrediction(resultData.data.age).toUpperCase()}</h1>
            </div>
            <div
              onClick={() => setActiveCategory("gender")}
              className={`gender__box ${
                activeCategory === "gender" ? "active" : ""
              } box`}
            >
              <p>{findTopPrediction(resultData.data.gender).toUpperCase()}</p>
              <h1>Gender</h1>
            </div>
          </div>
          <div className="summary__graphics">
            <h1 className={`summary__graphics--h1`}>
              {activeCategory === "age" ? (
                <>{topPrediction[0].toUpperCase()} Y.O</>
              ) : (
                <>{topPrediction[0].toUpperCase()}</>
              )}
            </h1>
            <div
              className="graph"
              style={{ "--percentage": `${percentageValue}%` }}
            >
              <h1 className="graph__percentage">{percentageValue}%</h1>
            </div>
            <h4 className="note__message">
              AI prediction not quite right?
              <br /> Try again with a different photo for a better result.
            </h4>
          </div>
          <div className="summary__third">
            <div className="summary__third--heading">
              <h1 className="summary__third--h1">
                {activeCategory.toUpperCase()}
              </h1>
              <h1 className="summary__third--h1">A.I. CONFIDENCE</h1>
            </div>
            {sortedDisplayData.map(([name, confidence]) => (
              <div
                key={name}
                className={`list__summary--details ${
                  name === topPrediction[0] ? "active" : ""
                }`}
              >
                <p className="list__summary">
                  <FontAwesomeIcon className="diamond__icon" icon={faDiamond} />{" "}
                  {name.toUpperCase()}
                </p>
                <p className="list__summary--percentage">
                  {Math.round(confidence * 100)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMobile ? (
        <>
          <div className="bottom__btn">
            <BackBtn message="BACK" source="/result" />
            <ProceedBtn
              message="END SUMMARY"
              source="/"
              onClick={handleFinishProcess}
            />
          </div>
        </>
      ) : (
        <>
          <BackBtn message="BACK" source="/result" />
          <ProceedBtn
            message="END SUMMARY"
            source="/"
            onClick={handleFinishProcess}
          />
        </>
      )}
    </section>
  );
};

export default Summary;
