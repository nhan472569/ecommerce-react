import { AdvancedImage } from '@cloudinary/react';
import createUrl from '../../common/utils/cloudinary-utils';
import SkeletonLoading from '../UI/loading/SkeletonLoading';
import classes from './UserItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useCallback, useState } from 'react';
import Modal from '../UI/Modal';
import useHttp from '../../hooks/use-http';
import { useDispatch, useSelector } from 'react-redux';
import { notificationAction } from '../../store/notification-context';
import NotificationModel from '../../models/NotificationModel';
import Button from '../UI/Button';
import LoadingSpinner from '../UI/LoadingSpinner';
import { Form, Formik } from 'formik';
import FormControl from '../UI/FormControl';
import * as Yup from 'yup';

const roleMap = {
  user: 'Người dùng',
  admin: 'Quản trị viên',
};

const UpdateInfoSchema = Yup.object().shape({
  name: Yup.string().trim().required('Vui lòng nhập tên.'),
  email: Yup.string().trim().required('Vui lòng nhập email.').email(),
});

const UserItem = ({ user, onDoUserAction }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const currentAdminUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const { sendRequest: callDeleteUser } = useHttp(
    useCallback(() => {
      dispatch(
        notificationAction.push(
          new NotificationModel(
            'success',
            'Xoá người dùng thành công.'
          ).toJSON()
        )
      );
      onDoUserAction();
    }, [dispatch, onDoUserAction])
  );

  const { isLoading, sendRequest: callModifyUser } = useHttp(
    useCallback(() => {
      dispatch(
        notificationAction.push(
          new NotificationModel(
            'success',
            'Cập nhật thông tin người dùng thành công.'
          ).toJSON()
        )
      );
      onDoUserAction();
    }, [dispatch, onDoUserAction])
  );

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const modifyUser = values => {
    callModifyUser({
      url: `users/${user._id}`,
      method: 'patch',
      body: values,
    });
  };

  const deleteUser = () => {
    if (currentAdminUser._id === user._id || user.role === 'admin') return;

    const confirm = window.confirm('Bạn có muốn xoá người dùng này không?');
    if (confirm) {
      callDeleteUser({
        url: `users/${user._id}`,
        method: 'delete',
      });
    }
  };

  const modifyTemplate = (
    <div className={classes.modifyForm}>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          active: user.active,
        }}
        validationSchema={UpdateInfoSchema}
        onSubmit={modifyUser}
        enableReinitialize
      >
        {({ errors, touched, dirty }) => (
          <Form>
            <FormControl
              type="text"
              name="name"
              errors={errors}
              touched={touched}
            >
              Tên người dùng
            </FormControl>
            <FormControl
              type="email"
              name="email"
              errors={errors}
              touched={touched}
            >
              Email
            </FormControl>
            <FormControl
              as="select"
              name="active"
              errors={errors}
              touched={touched}
              fieldChildren={
                <>
                  <option value={true}>Kích hoạt</option>
                  <option value={false}>Vô hiệu hoá</option>
                </>
              }
            >
              Trạng thái hoạt động
            </FormControl>
            <Button mode="primary" disabled={!dirty || isLoading}>
              {isLoading ? (
                <LoadingSpinner
                  color="var(--color-white)"
                  borderSize="3px"
                  size="20px"
                />
              ) : (
                'Lưu'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <div className={classes.item}>
      <div className={classes.avatar}>
        <AdvancedImage cldImg={createUrl(user.photo, 150, 150)} alt="avatar" />
      </div>
      <div className={classes.ContentBox}>
        <p className={classes.username}>
          {user.name} ({user.email})
        </p>
        <p className={classes.content}>Loại tài khoản: {roleMap[user.role]}</p>
        <p className={classes.content}>
          Trạng thái: {user.active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
        </p>
      </div>
      <div className={classes.actions}>
        <span
          className={classes.modify}
          onClick={() => openDialog('modify')}
          title="Chỉnh sửa"
        >
          <FontAwesomeIcon icon={solid('pen-to-square')}></FontAwesomeIcon>
        </span>
        {user.role === 'user' ? (
          <span className={classes.delete} onClick={deleteUser} title="Xoá">
            <FontAwesomeIcon icon={solid('trash')}></FontAwesomeIcon>
          </span>
        ) : null}
      </div>

      {isOpenDialog ? (
        <Modal onClose={closeDialog}>{modifyTemplate}</Modal>
      ) : null}
    </div>
  );
};

const Loading = () => {
  return (
    <div className={classes.item}>
      <div className={classes.avatar}>
        <SkeletonLoading className="w-full h-full radius" />
      </div>
      <div className={classes.ContentBox}>
        <SkeletonLoading className="w-full h-17 mb-10 radius" />
        <SkeletonLoading className="w-full h-17 mb-10 radius" />
      </div>
    </div>
  );
};
UserItem.Loading = Loading;

export default UserItem;
