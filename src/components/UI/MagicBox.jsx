
const MagicBox = ({isAnimated, isHover}) => {
  return (
    <div className="design__wrapper">
      <div className={`magic__box ${!isAnimated ? 'no-animation':''} ${isHover ? 'magic__box--hover': ''}`}></div>
    </div>
  );
};

export default MagicBox;
