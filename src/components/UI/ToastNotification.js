import { useSelector } from 'react-redux';
import ToastItem from './ToastItem';
import classes from './ToastNotification.module.css';

const ToastNotification = () => {
  const toasts = useSelector(state => state.noti).toasts;

  return (
    <div className={classes.toastsBox}>
      {toasts.map((toast, i) => (
        <ToastItem message={toast.message} status={toast.status} key={i} />
      ))}
    </div>
  );
};
export default ToastNotification;
