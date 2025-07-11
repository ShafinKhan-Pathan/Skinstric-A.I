import { useEffect, useState } from "react";
import RightIcon from "/icons/RightIcon.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getConfirmation } from "../services/api";
import MagicBox from "./UI/MagicBox";
import LoadingState from "./UI/LoadingState";
import SubmittionMessage from "./UI/SubmittionMessage";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
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
        {error && !loading && <h1 className="error__message">{error}</h1>}
        {loading && <LoadingState message="Processing information..." />}
        {!loading && !error && (
          <>
            <MagicBox isAnimated={true} />
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
                  Hi <span>{watchFormId}</span> Which City are you from ??
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
            <SubmittionMessage
              greeting="Thank you !!"
              message="Proceed for the next step"
            />
          </>
        )}

        <BackBtn message="BACK" source="/" />
        {step === "submitted" && (
          <ProceedBtn message="PROCEED" source="/result" />
        )}
      </div>
    </section>
  );
};

export default Test;
