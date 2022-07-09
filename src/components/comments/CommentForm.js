import { useRef } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../hooks/use-http';
import classes from './CommentForm.module.css';

const CommentForm = props => {
  const commentInputRef = useRef();
  const user = useSelector(state => state.auth.user);

  const { productId, onAddComment } = props;

  const { isLoading, error, sendRequest: postComment } = useHttp(onAddComment);

  const submitCommentHandler = e => {
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

      postComment({
        url: `products/comment/${productId}`,
        method: 'post',
        body: {
          content: comment,
          userID: user._id,
        },
      });

      if (!isLoading && !error) {
        commentInputRef.current.value = '';
      }
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
