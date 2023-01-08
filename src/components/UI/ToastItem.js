import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../store/notification-context';
import classes from './ToastItem.module.css';

const ToastItem = ({ message, status }) => {
  const [opacity, setOpacity] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(notificationAction.pop());
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const colors = {
    error: { color: 'red' },
    success: { color: 'green' },
    info: { color: 'blue' },
  };
  const titleVieMapping = {
    error: 'Lỗi',
    success: 'Thành công',
    info: 'Thông tin',
  };
  const getIcon = status => {
    let icon;
    switch (status) {
      case 'error':
        icon = (
          <FontAwesomeIcon
            icon={solid('triangle-exclamation')}
            className={classes.icon}
            style={colors[status]}
          />
        );
        break;
      case 'success':
        icon = (
          <FontAwesomeIcon
            icon={solid('circle-check')}
            className={classes.icon}
            style={colors[status]}
          />
        );
        break;
      case 'info':
        icon = (
          <FontAwesomeIcon
            icon={solid('circle-info')}
            className={classes.icon}
            style={colors[status]}
          />
        );
        break;
      default:
        icon = null;
        break;
    }
    return icon;
  };

  const closeHandler = () => {
    setOpacity(0);
    dispatch(notificationAction.pop());
  };

  return (
    <div
      className={classes.toast}
      style={{
        borderLeft: `4px solid ${colors[status].color}`,
        opacity,
      }}
    >
      {getIcon(status)}
      <div className={classes.detail}>
        <p className={classes.title}>{titleVieMapping[status]}</p>
        <p className={classes.message}>{message}</p>
      </div>
      <span className={classes.close} onClick={closeHandler}>
        <FontAwesomeIcon icon={solid('xmark')} />
      </span>
    </div>
  );
};

export default ToastItem;
