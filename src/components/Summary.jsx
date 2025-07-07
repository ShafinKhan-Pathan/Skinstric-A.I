import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  const resultData = location.state?.apiResult;
  //   Convert Object data to arrays
  const age = Object.entries(resultData.data.age);
  const race = Object.entries(resultData.data.race);
  const gender = Object.entries(resultData.data.gender);
  console.log(race);
  age.sort((a, b) => b[1] - a[1]);
  race.sort((a, b) => b[1] - a[1]);
  gender.sort((a, b) => b[1] - a[1]);
  const topAgePrediction = age[0];
  const topRacePrediction = race[0];
  const topGenderPrediction = gender[0];
  console.log("This is the testing ", resultData);
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
            <div className="race__box box">
              <p>{topRacePrediction[0].toUpperCase()}</p>
              <h1>RACE</h1>
            </div>
            <div className="age__box box">
              <p>Age</p>
              <h1>{topAgePrediction[0]}</h1>
            </div>
            <div className="gender__box box">
              <p>{topGenderPrediction[0].toUpperCase()}</p>
              <h1>Gender</h1>
            </div>
          </div>
          <div className="summary__graphics">
            <h1 className="summary__graphics--h1">
              {topRacePrediction[0].toUpperCase()}
            </h1>
            <div className="graph">
              <h1 className="graph__percentage">
                {Math.round(topRacePrediction[1] * 100)}%
              </h1>
            </div>
          </div>
          <div className="summary__third">
            <div className="summary__third--heading">
              <h1 className="summary__third--h1">RACE</h1>
              <h1 className="summary__third--h1">A.I. CONFIDENCE</h1>
            </div>
            {race.map((getRace) => (
              <div className="list__summary--details">
                <p className="list__summary">
                  <FontAwesomeIcon className="diamond__icon" icon={faDiamond} />{" "}
                  {getRace[0].toUpperCase()}
                </p>
                <p className="list__summary--percentage">
                  {Math.round(getRace[1] * 100)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BackBtn message="BACK" source="/resultinfo" />
      <ProceedBtn message="END SUMMARY" source="/" />
    </section>
  );
};

export default Summary;
