import classes from './CommentItem.module.css';

const CommentItem = props => {
  return (
    <div className={classes.item}>
      <div className={classes.avatar}>
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className={classes.ContentBox}>
        <div className={classes.username}>{props.username}</div>
        <div className={classes.content}>{props.content}</div>
      </div>
      <p className={classes.date}>{props.date}</p>
    </div>
  );
};

export default CommentItem;
