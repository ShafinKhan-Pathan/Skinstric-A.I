import { useEffect, useState } from "react";
import LeftIcon from "/icons/LeftIcon.png";
import RightIcon from "/icons/RightIcon.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getConfirmation } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Test = () => {
  const [step, setStep] = useState("name");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finalData, setFinalData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchFormId = watch("name");
  const onNameSubmit = (data) => {
    setFinalData((prevData) => ({ ...prevData, ...data }));
    setStep("city");
  };
  const onCitySubmit = (data) => {
    setFinalData((prevData) => ({ ...prevData, ...data }));
  };
  useEffect(() => {
    if (!finalData.name || !finalData.location) {
      return;
    }
    const getConfirmationData = async () => {
      setLoading(true);
      try {
        const getConfirmationResult = await getConfirmation(finalData);
        console.log(getConfirmationResult);
        setStep("submitted");
      } catch (error) {
        console.log("API Error", error);
        setError("We're sorry, something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getConfirmationData();
  }, [finalData]);
  return (
    <section>
      <h2>TO START ANALYSIS</h2>
      <div className="analysis__wrapper">
        <div className="anylasis__box">
          {error && !loading && <h1 className="error__message">{error}</h1>}
          {loading && (
            <>
              <div className="loading__info">
                <h1>Processing information...</h1>
                <FontAwesomeIcon icon={faSpinner} className="spinner" />
              </div>
            </>
          )}
          {!loading && !error && (
            <>
              {step === "name" && (
                <form
                  className="form__analysis"
                  onSubmit={handleSubmit(onNameSubmit)}
                >
                  <label className="form__label">CLICK TO TYPE</label>
                  <input
                    id="name"
                    className="form__input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Enter Your Name ..."
                    {...register("name", {
                      required: "Your name is required to proceed",
                      maxLength: {
                        value: 20,
                        message: "Name must be less than 20 character",
                      },
                      minLength: {
                        value: 3,
                        message: "Name Required at least 3 Char",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="error__message">{errors.name.message}</p>
                  )}
                </form>
              )}

              {step === "city" && (
                <form
                  className="form__analysis"
                  onSubmit={handleSubmit(onCitySubmit)}
                >
                  <label className="form__label">
                    Hi {watchFormId} Which City are you from ??
                  </label>
                  <input
                    id="location"
                    className="form__input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Enter Your City ..."
                    {...register("location", {
                      required: "City name is required to proceed",
                      maxLength: {
                        value: 30,
                        message: "City Name must be less than 30 character",
                      },
                      minLength: {
                        value: 3,
                        message: "City Name Required at least 3 Char",
                      },
                    })}
                  />
                  {errors.location && (
                    <p className="error__message">{errors.location.message}</p>
                  )}
                </form>
              )}
            </>
          )}
          {step === "submitted" && (
            <>
              <div className="submittion__message">
                <h1>Thank you !!</h1>
                <p>Proceed for the next step</p>
              </div>
            </>
          )}
        </div>
        <div className="back__btn">
          <Link to="/" className="back__btn--link">
            <img src={LeftIcon} alt="" />
            <p>BACK</p>
          </Link>
          {step === "submitted" && (
            <Link to="/result" className="proceed__btn--link">
              <p>PROCEED</p>
              <img src={RightIcon} alt="" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Test;
