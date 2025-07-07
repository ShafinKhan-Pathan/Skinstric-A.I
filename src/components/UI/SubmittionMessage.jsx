import React from "react";

const SubmittionMessage = ({greeting, message}) => {
  return (
    <div className="submittion__message">
      <h1>{greeting}</h1>
      <p>{message}</p>
    </div>
  );
};

export default SubmittionMessage;
