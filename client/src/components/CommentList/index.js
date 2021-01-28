import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid'
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// import { useStoreContext } from "../../utils/GlobalState";

const useStyles = makeStyles({
  root: {
    
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CommentList = (props) => {
  
  
  const {title, comments} = props
  // console.log("props",props);
  
  // const [state, dispatch] = useStoreContext();
  // console.log("SELECTEDARTIST",state.selectedArtist);
  
  const classes = useStyles();
  
 if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }
  return (
    <div>
      <h3>{title}</h3>
      {comments &&
        comments.map((comment) => (
          
            <Grid item xs ={12}>
            <Card className={classes.root} variant="outlined" >
              <CardContent>
                <Typography variant="subtitle1">{comment.createdAt}</Typography>
                <Typography variant="h5" component="h2">
                   {comment.username} says...
                </Typography>

                <Typography variant="body2" component="p">
                 {comment.commentText}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">reply</Button>
              </CardActions>
            </Card>
            </Grid>
        ))}
    </div>
  );
};

export default CommentList;



  // const { loading, data } = useQuery(QUERY_COMMENTS, {
  //   variables:{

  //   }
  // });
  // const { currentUser} = state;

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