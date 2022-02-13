import { useRef } from 'react';
import { useSelector } from 'react-redux';
import classes from './CommentForm.module.css';

const CommentForm = props => {
  const commentInputRef = useRef();
  const user = useSelector(state => state.auth.user);

  const { productId, onAddComment } = props;

  const submitCommentHandler = async e => {
    e.preventDefault();
    let comment = commentInputRef.current.value;
    try {
      const response = await fetch(
        `http://do-an-nganh-nodejs.herokuapp.com/api/products/comment/${productId}`,
        {
          method: 'POST',
          body: JSON.stringify({ content: comment, userID: user.payload._id }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      commentInputRef.current.value = '';
      onAddComment();
    } catch (error) {
      console.log(error.message);
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
