import classes from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
  const customStyle = {
    border: `${props.borderSize} solid ${props.color}`,
    borderColor: `${props.color} transparent transparent transparent`,
    width: `${parseInt(props.size, 10) - parseInt(props.borderSize, 10) * 2}px`,
    height: `${
      parseInt(props.size, 10) - parseInt(props.borderSize, 10) * 2
    }px`,
    margin: props.borderSize,
  };
  return (
    <div
      className={classes['lds-ring']}
      style={{ width: props.size, height: props.size }}
    >
      <div style={customStyle}></div>
      <div style={customStyle}></div>
      <div style={customStyle}></div>
      <div style={customStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
