import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid'
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  comment: {
    borderBottom: 'none !important'
  },
  noComments: {
    margin: theme.spacing(1)
  }
}));

const CommentList = (props) => {
  const {comments} = props  
  const classes = useStyles();
  
  if (!comments.length) {
    return <p className={classes.noComments}>No comments yet!</p>;
  }
  return (
    <div className={classes.root}>
      { comments && comments.length && <Grid item xs={12}>
        { comments.map((comment) => (
            <Card key={comment._id} className={classes.comment} square={true} variant="outlined" >
              <CardContent>
                <Typography variant="subtitle1">{comment.createdAt}</Typography>
                <Typography variant="h5" component="h2">
                  {comment.username} says...
                </Typography>

                <Typography variant="body2" component="p">
                  {comment.commentText}
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>     
        ))}
        </Grid>}
    </div>
  );
};

export default CommentList;