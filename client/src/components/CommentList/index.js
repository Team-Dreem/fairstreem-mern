import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStoreContext } from "../../utils/GlobalState";

const useStyles = makeStyles({
  root: {
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CommentList() {

  const [state, dispatch] = useStoreContext();

  console.log("CURRENTARTIST",state.currentArtist)

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        
        <Typography variant="h5" component="h2">
          (Created at)User says...
        </Typography>
       
        <Typography variant="body2" component="p">
            {/* data.commentText */}
          I like this artist, rock song #999 is my favorite!
          I like this artist, rock song #999 is my favorite!
          I like this artist, rock song #999 is my favorite!
          I like this artist, rock song #999 is my favorite!
          <br />
         
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">reply</Button>
      </CardActions>
    </Card>
  );
}
