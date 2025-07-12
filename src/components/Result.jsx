import cameraLens from "/icons/camera.png";
import gallery from "/icons/gallery.png";
import MagicBox from "./UI/MagicBox";
import { useEffect, useRef, useState } from "react";
import { submitPhaseTwo } from "../services/api";
import LoadingState from "./UI/LoadingState";
import SubmittionMessage from "./UI/SubmittionMessage";
import BackBtn from "./UI/BackBtn";
import ProceedBtn from "./UI/ProceedBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLeftLong } from "@fortawesome/free-solid-svg-icons";
const Result = () => {
  // Which view we are showing Camera or options
  const [view, setView] = useState("options");
  // Permission Pop up for camera
  const [activeClick, setActiveClick] = useState("notactive");
  // Hold Live camera screen once we get it. Starts with empty
  const [stream, setStream] = useState(null);
  // Video Screen Ref
  const videoRef = useRef();
  // Canvas Ref
  const canvasRef = useRef();
  const fileInputRef = useRef(null);
  const [base64Image, setBase64Image] = useState(
    () => sessionStorage.getItem("Previous Uploaded Image") || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleCameraClick = () => {
    setActiveClick("active");
  };
  const convertFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64URL = reader.result;
        setBase64Image(base64URL);
        sessionStorage.setItem("Previous Uploaded Image", base64URL);
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
      const resultData = await submitPhaseTwo(convertedImage);
      setFinalData(resultData);
    } catch (error) {
      setError("Failed to submit. Please try again");
    } finally {
      setLoading(false);
    }
  };
  const handleOpenCamera = async () => {
    setActiveClick("notactive");
    try {
      // Requesting browser to use the camera
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, //Get the front camera
        audio: false,
      });
      // If user says yes, we get the mediaStream which is the live video feed
      setStream(mediaStream);
      setView("camera");
    } catch (error) {
      // console.error("Error accessing camera:", error);
      setError("Camera Permission denied", error);
    }
  };
  const handleCloseCamera = () => {
    if (stream) {
      // Stop all tracks of the media stream to close the camera
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setView("options");
    }
  };
  // What if user click on take photo
  const handleTakeImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64URL = canvas.toDataURL("image/png");
      handleCloseCamera();
      setBase64Image(base64URL);
      sessionStorage.setItem("Previous Uploaded Image", base64URL);
      getUploadedImageData(base64URL);
    }
  };
  useEffect(() => {
    if (stream && videoRef.current) {
      // If we have a stream, set the video source to the stream
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <section>
      <h1 className="title__heading">T0 START ANALYSIS</h1>

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

      {view === "camera" && (
        <>{loading && <LoadingState message="PREPARING YOUR ANALYSIS.." />}</>
      )}
      {view === "camera" && stream && (
        <>
          <div className="camera__view--container">
            <video
              className="camera__video"
              ref={videoRef}
              autoPlay
              playsInline
            />
            <canvas
              className="camera__canvas"
              ref={canvasRef}
              style={{ display: "none" }}
            />
            <div className="camera__overlay">
              <p className="camera__overlay--para">TO GET BETTER RESULT MAKE SURE YOU HAVE</p>
              <div className="camera__instructions">
                <p>NEUTRAL EXPRESSION</p>
                <p>FRONTAL POSE</p>
                <p>ADEQUATE LIGHTING</p>
              </div>
              TAKE PHOTO
              <div className="camera__click--btn" onClick={handleTakeImage}>
                <FontAwesomeIcon icon={faCamera} className="camera__icon" />
              </div>
              <div className="camera__close--btn" onClick={handleCloseCamera}>
                <FontAwesomeIcon icon={faLeftLong} />
                BACK
              </div>
            </div>
          </div>
        </>
      )}
      {view === "options" && (
        <>
          {loading && <LoadingState message="Analyzing the image" />}
          {!loading && !error && !finalData && (
            <div className="result__wrapper">
              <div className="camera__wrapper">
                <MagicBox isAnimated={true} />
                <img
                  onClick={handleCameraClick}
                  src={cameraLens}
                  alt="Image Upload From gallery"
                  className="options__camera--img"
                />
                <div className="message">
                  <p>ALLOW A.I. TO SCAN YOUR FACE</p>
                </div>

                <div
                  className={`camera__access--message ${
                    activeClick === "active" ? "visible" : ""
                  }`}
                >
                  <p>ALLOW A.I. TO ACCESS YOUR CAMERA</p>
                  <button onClick={() => setActiveClick("nonactive")}>
                    DENY
                  </button>
                  <button onClick={handleOpenCamera}>ALLOW</button>
                </div>
              </div>
              {activeClick === "active" ? (
                <>
                  <div
                    className="gallery__wrapper"
                    style={{
                      opacity: "0.4",
                      pointerEvents: "none",
                      transition: "opacity 1s",
                    }}
                  >
                    <MagicBox isAnimated={true} />

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
                      className="options__camera--img"
                    />
                    <div className="message">
                      <p>ALLOW A.I. TO ACCESS GALLERY</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="gallery__wrapper">
                    <MagicBox isAnimated={true} />
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
                      className="options__camera--img"
                    />
                    <div className="message">
                      <p>ALLOW A.I. TO ACCESS GALLERY</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}

      {finalData && !loading && !error && (
        <>
          <MagicBox isAnimated={true} />
          <SubmittionMessage
            greeting="IMAGE ANALYZED SUCCESSFULLY"
            message="Proceed to check the result"
          />
        </>
      )}
      <div className="back__btn">
        <BackBtn message="BACK" source="/testing" />
        {finalData && !loading && !error && (
          <ProceedBtn
            message="PROCEED"
            source="/resultinfo"
            resultData={finalData}
          />
        )}
      </div>
    </section>
  );
};

export default Result;
