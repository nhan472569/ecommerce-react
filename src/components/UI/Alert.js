import classes from './Alert.module.css';
import reactDom from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const overlayEl = document.getElementById('overlays');

const Alert = ({ type, children, onClose }) => {
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
        <div className={classes.alert + ' ' + classes[`alert-${type}`]}>
          {getIcon(type)}
          <div className={classes.detail}>
            <h4 className={classes.title}>{titleVieMapping[type]}</h4>
            <div className={classes.message}>{children}</div>
          </div>
          <button type="button" onClick={onClose} className={classes.close}>
            <FontAwesomeIcon icon={solid('xmark')} />
          </button>
          <div className={classes['progress-bar']}></div>
        </div>,
        overlayEl
      )}
    </>
  );
};

export default Alert;
