import React from "react";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART } from "../../utils/actions";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Button from "@material-ui/core/Button";

const Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "1rem",
    margin: ".5rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  button: {
    display: "flex",
    alignItems: "flex-end",
  },
}));

const SongCard = (song) => {
  const [state, dispatch] = useStoreContext();
const { cart } = state;
const { _id, title, description, price, song_url, tags } = song;

const addToCart = () => {
  console.log("buy clicked");
const itemInCart = cart.find((cartItem) => cartItem._id === _id);
 // if there was a match, call UPDATE with a new purchase quantity
 if (itemInCart) {
   return (
     <p>You already have this song in your cart!</p>
   )
} else {
  dispatch({
    type: ADD_TO_CART,
    product: { ...song },
  });
  idbPromise("cart", "put", { ...song });
}
};

  const theme = useTheme();
  const classes = Styles();

  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Title: {title}
              <br></br>
              Description: {description}
              <br></br>
              Price: {price}
              <br></br>
              Song_url: {song_url}
              <br></br>
              Tags: {tags}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="../../assets/placeholder-cat.jpg"
          title="Live from space album cover"
        />
        <Button onClick={addToCart} className={classes.button}>Buy</Button>
      </Card>
    </div>
  );
}

export default SongCard;
