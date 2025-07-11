import MagicBox from "./UI/MagicBox";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResultInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.apiResult;
  const navigateToSummary = () => {
    navigate("/summary", { state: { apiResult: resultData } });
  };
  if (!resultData) {
    <section style={{ textAlign: "center", padding: "50px" }}>
      <h1>No Data Found</h1>
      <p>Please start the analysis from the beginning.</p>
      <Link to="/result">Go Back</Link>
    </section>;
  }
  return (
    <section>
      <h1>A.I. ANALYSIS</h1>
      <h4>A.I. HAS ESTIMATED THE FOLLOWING.</h4>
      <h4>FIX ESTIMATED INFORMATION IF NEEDED</h4>
      <MagicBox isAnimated={false} />
      <div className="option__wrapper">
        <div className="demographic" onClick={navigateToSummary}>
          <div className="demographic__border"></div>
          <p>Demographic</p>
        </div>
        <div className="cosmetics">
          <p>
            Cosmetics <br />
            Concerns
          </p>
        </div>
        <div className="weather">
          <p>Weather</p>
        </div>
        <div className="skin__type">
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
