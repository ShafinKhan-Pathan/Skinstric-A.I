import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const findTopPrediction = (predictions) => {
  if (!predictions || Object.keys(predictions).length === 0) return;
  const predictedArray = Object.entries(predictions);
  predictedArray.sort((a, b) => b[1] - a[1]);
  return predictedArray[0][0];
};

const Summary = () => {
  const location = useLocation();
  const resultData = location.state?.apiResult;
  const [activeCategory, setActiveCategory] = useState("race");
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

  return (
    <section>
      <div className="summary__wrapper">
        <div className="summary__heading">
          <h4 className="summary__heading--h4">A.I. ANALYSIS</h4>
          <h1 className="summary__heading--h1">DEMOGRAPHICS</h1>
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

      <BackBtn message="BACK" source="/result" />
      <ProceedBtn
        message="END SUMMARY"
        source="/"
        onClick={handleFinishProcess}
      />
    </section>
  );
};

export default Summary;
