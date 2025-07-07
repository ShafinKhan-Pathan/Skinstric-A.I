import { Link } from "react-router-dom";
import LeftIcon from "/icons/LeftIcon.png";
import RightIcon from "/icons/RightIcon.png";
import cameraLens from "/icons/camera.png";
import gallery from "/icons/gallery.png";
import MagicBox from "./UI/MagicBox";
import { useEffect, useRef, useState } from "react";
import { getUploadedImage } from "../services/api";
import LoadingState from "./UI/LoadingState";
import SubmittionMessage from "./UI/SubmittionMessage";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
const Result = () => {
  const fileInputRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  // Convert Image format to BASE64
  const convertFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64URL = reader.result;
        setBase64Image(base64URL);
        getUploadedImageData(base64URL);
      };
    }
  };
  const getUploadedImageData = async (base64Image) => {
    if (!base64Image) {
      return;
    }
    setLoading(true);
    try {
      const convertedImage = { image: base64Image };
      const  resultData  = await getUploadedImage(convertedImage);
      console.log(resultData);
      setFinalData(resultData);
    } catch (error) {
      setError("Failed to submit. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1>T0 START ANALYSIS</h1>
      {loading && <LoadingState message="Analyzing the image" />}

      {!loading && !error && !finalData && (
        <div className="result__wrapper">
          <div className="camera__wrapper">
            <MagicBox />
            <img src={cameraLens} alt="Image Upload From gallery" />
            <div className="message">
              <p>ALLOW A.I. TO SCAN YOUR FACE</p>
            </div>
          </div>
          <div className="gallery__wrapper">
            <MagicBox />
            <input
              type="file"
              ref={fileInputRef}
              onChange={convertFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            <img
              src={gallery}
              alt="Upload Gallery Image"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            <div className="message">
              <p>ALLOW A.I. TO ACCESS GALLERY</p>
            </div>
            <div className="preview__wrapper">
              <p className="preview__message">Preview</p>

              <div className="preview__image">
                {base64Image && (
                  <img
                    className="preview__image--base64"
                    src={base64Image}
                    alt="Preview_Image"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {finalData && !loading && !error && (
        <>
          <MagicBox />
          <SubmittionMessage
            greeting="Your Image Is analyzed.."
            message="Proceed to check the result"
          />
        </>
      )}
      <div className="back__btn">
        <BackBtn message="BACK" source="/testing" />
        {finalData && !loading && !error && (
          <>            <div className="preview__wrapper">
              <p className="preview__message">Preview</p>

              <div className="preview__image">
                {base64Image && (
                  <img
                    className="preview__image--base64"
                    src={base64Image}
                    alt="Preview_Image"
                  />
                )}
              </div>
            </div>
          <ProceedBtn message="PROCEED" source="/resultinfo" resultData={finalData} />
          </>
        )}
      </div>
    </section>
  );
};

export default Result;
