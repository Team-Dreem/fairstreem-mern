import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CommentList = (comments, title) => {

  console.log("comments", comments);
  
  // const [state, dispatch] = useStoreContext();
  // const { loading, data } = useQuery(QUERY_ME);
  // const { currentUser, currentArtist } = state;

  // const [addComment] = useMutation(ADD_COMMENT);

  // useEffect(() => {
  //   if (data && data.me) {
  //     const { me } = data;

  //     dispatch({
  //       type: UPDATE_CURRENT_USER,
  //       currentUser: me,
  //     });
  //   }
  // }, [loading, data]);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }
  return (
    <div>
      <h3>{title}</h3>
      {comments &&
        comments.map((comment) => (
          <div>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {comment.createdAt} {comment.username} says...
                </Typography>

                <Typography variant="body2" component="p">
                 {comment.commentText}
                  I like this artist, rock song #999 is my favorite!
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">reply</Button>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default CommentList;
