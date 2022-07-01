import { useState, useEffect } from 'react';

import classes from './CommentBox.module.css';
import CommentForm from './CommentForm';
import environment from '../../environment';
import CommentsList from './CommentsList';

const CommentBox = props => {
  const [comments, setComments] = useState([]);

  const { productId } = props;
  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(
        `${environment.DOMAIN}/api/products/comment/${productId}`
      );
      const comments = await response.json();
      setComments(comments);
    };
    getComments();
  }, [productId]);

  const onAddCommentHandler = async () => {
    const response = await fetch(
      `${environment.DOMAIN}/api/products/comment/${productId}`
    );
    const comments = await response.json();
    setComments(comments);
  };

  return (
    <div className={classes.box}>
      <h2 className={classes.title}>Bình luận</h2>
      <CommentForm onAddComment={onAddCommentHandler} productId={productId} />
      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentBox;
