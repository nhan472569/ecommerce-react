import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = props => {
  return (
    <div className={classes.box}>
      {props.comments.map(comment => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          bookId={props.bookId}
          avatar={comment.user.photo}
          username={comment.user.name}
          content={comment.review}
          date={comment.createAt}
          deleteComment={props.deleteComment}
        />
      ))}
    </div>
  );
};

export default CommentsList;
