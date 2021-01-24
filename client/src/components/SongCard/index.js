import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_SONGS } from "../../utils/queries";
import { UPDATE_SONGS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from '@material-ui/core/CardMedia';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Button from "@material-ui/core/Button";

import { QUERY_ARTISTS } from "../../utils/queries";
import { UPDATE_ARTISTS, UPDATE_CURRENT_ARTIST } from "../../utils/actions";

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

const SongCard = () => {
  const [state, dispatch] = useStoreContext();
const { currentArtist } = state;

console.log("currentArtist", currentArtist);
const { loading, data } = useQuery(QUERY_SONGS);

useEffect(() => {
  // if there's data to be stored
  if (data) {
    // let's store it in the global state object
    dispatch({
      type: UPDATE_SONGS,
      songs: data.songs,
    });

    // but let's also take each song and save it to IndexedDB using the helper function
    data.songs.forEach((song) => {
      idbPromise("songs", "put", song);
    });
    // add else if to check if `loading` is undefined in `useQuery()` Hook
  } else if (!loading) {
    // since we're offline, get all of the data from the `songs` store
    idbPromise("songs", "get").then((songs) => {
      // use retrieved data to set global state for offline browsing
      dispatch({
        type: UPDATE_SONGS,
        songs: songs,
      });
    });
  }
}, [data, loading, dispatch]);

function filterSongs() {
  return state.songs.filter((song) => song.artistId === currentArtist._id);
}
console.log("filterSongs", filterSongs());
console.log("currenArtist._id", currentArtist._id);

  // const { image, title, _id, price, artistId, tags, song_url } = props;
  console.log("SongCardArtist", state.currentArtist);
  // console.log("title", title);
  // console.log("image", image);
  // console.log("_id", _id);
  // console.log("price", price);
  // console.log("artistId", artistId);
  // console.log("description", description);
  // console.log("song_url", song_url);
  // console.log("tags", tags);

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
        {/* <CardMedia
          className={classes.cover}
          image="../../assets/placeholder-cat.jpg"
          title="Live from space album cover"
        /> */}
        <Button className={classes.button}>buy</Button>
      </Card>
    </div>
  );
}

export default SongCard;
