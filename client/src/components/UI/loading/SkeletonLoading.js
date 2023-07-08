import classes from './SkeletonLoading.module.css';

const SkeletonLoading = ({ className = '' }) => {
  return <div className={`${classes.skeleton} ${className}`}></div>;
};

export default SkeletonLoading;
