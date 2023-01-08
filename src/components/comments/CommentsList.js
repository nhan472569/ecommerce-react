import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = props => {
  return (
    <div className={classes.box}>
      {props.comments.map(comment => (
        <CommentItem
          key={comment._id}
          avatar={comment.user.photo}
          username={comment.user.name}
          content={comment.review}
          date={comment.createAt}
        />
      ))}
    </div>
  );
};

export default CommentsList;
