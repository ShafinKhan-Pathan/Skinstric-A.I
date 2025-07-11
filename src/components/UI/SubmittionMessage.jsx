import React from "react";

const SubmittionMessage = ({greeting, message}) => {
  return (
    <div className="submittion__message">
      <h1 className="greeting__msg">{greeting}</h1>
      <p className="greeting__msg">{message}</p>
    </div>
  );
};

export default SubmittionMessage;
