import { useRef } from 'react';
import { useSelector } from 'react-redux';
import environment from '../../environment';
import classes from './CommentForm.module.css';

const CommentForm = props => {
  const commentInputRef = useRef();
  const user = useSelector(state => state.auth.user);

  const { productId, onAddComment } = props;

  const submitCommentHandler = async e => {
    e.preventDefault();
    try {
      const commentRaw = commentInputRef.current.value;
      const comment = commentRaw.trim();
      if (!user._id) {
        throw new Error('Vui lòng đăng nhập trước khi bình luận!');
      }

      if (comment.trim() === '') {
        throw new Error('Bình luận không thể để trống!');
      }

      const response = await fetch(
        `${environment.DOMAIN}/api/products/comment/${productId}`,
        {
          method: 'POST',
          body: JSON.stringify({
            content: comment,
            userID: user._id,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      commentInputRef.current.value = '';
      onAddComment();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitCommentHandler}>
      <textarea
        className={classes.textarea}
        placeholder="Viết bình luận..."
        ref={commentInputRef}
      />
      <button className={classes.button}>Gửi</button>
    </form>
  );
};

export default CommentForm;
