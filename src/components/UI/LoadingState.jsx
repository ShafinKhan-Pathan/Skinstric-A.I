import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MagicBox from "./MagicBox";

const LoadingState = ({message}) => {
  return (
    <div className="loading__info">
        <MagicBox isAnimated={true}/>
      <h1 className="loading__msg">{message}</h1>
      <FontAwesomeIcon icon={faSpinner} className="spinner" />
    </div>
  );
};

export default LoadingState;
