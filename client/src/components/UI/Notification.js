import classes from './Notification.module.css';
import reactDom from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationAction } from '../../store/notification-context';

const overlayEl = document.getElementById('overlays');
const TIMEOUT = 6000;
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

const Notification = ({ type, children, onClose, zIndex }) => {
  const [seconds, setSeconds] = useState(TIMEOUT / 1000 + 0.5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds - 0.5);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      onClose();
    }
  }, [seconds, onClose]);

  const getIcon = type => {
    let icon;
    switch (type) {
      case 'error':
        icon = (
          <FontAwesomeIcon
            icon={solid('triangle-exclamation')}
            className={classes.icon}
            style={colors[type]}
          />
        );
        break;
      case 'success':
        icon = (
          <FontAwesomeIcon
            icon={solid('circle-check')}
            className={classes.icon}
            style={colors[type]}
          />
        );
        break;
      case 'info':
        icon = (
          <FontAwesomeIcon
            icon={solid('circle-info')}
            className={classes.icon}
            style={colors[type]}
          />
        );
        break;
      default:
        icon = null;
        break;
    }
    return icon;
  };

  return (
    <>
      {reactDom.createPortal(
        <div
          className={classes.notication}
          style={{ zIndex }}
          data-type="notification"
        >
          {getIcon(type)}
          <div className={classes.detail}>
            <h4 className={classes.title}>{titleVieMapping[type]}</h4>
            <div className={classes.message}>{children}</div>
          </div>
          <button type="button" onClick={onClose} className={classes.close}>
            <FontAwesomeIcon icon={solid('xmark')} />
          </button>
          <div
            className={classes['progress-bar']}
            style={{
              backgroundColor: colors[type].color,
            }}
          ></div>
        </div>,
        overlayEl
      )}
    </>
  );
};

const NotificationContainer = () => {
  const notifications = useSelector(state => state.noti.notifications);
  const dispatch = useDispatch();

  const closeNotification = id => {
    dispatch(notificationAction.remove(id));
  };

  return (
    <>
      {!!notifications.length &&
        notifications.map((notification, i) => (
          <Notification
            key={notification.id}
            type={notification.type}
            onClose={() => closeNotification(notification.id)}
            zIndex={{ zIndex: i + 1 + '' }}
          >
            {notification.message}
          </Notification>
        ))}
    </>
  );
};

Notification.Container = NotificationContainer;
export default Notification;
