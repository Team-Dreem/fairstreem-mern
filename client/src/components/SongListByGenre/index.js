import React, { useEffect } from 'react';
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SONGS } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import SongItem from "../SongItem";
import { QUERY_SONGS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1
  }
}))

function SongListByGenre() {
const [state, dispatch] = useStoreContext();

const { currentGenre } = state;

const { loading, data } = useQuery(QUERY_SONGS);

const classes = useStyles();

useEffect(() => {
  // if there's data to be stored
  if (data) {
    // let's store it in the global state object
    dispatch({
      type: UPDATE_SONGS,
      songs: data.songs
    });

    // but let's also take each song and save it to IndexedDB using the helper function 
    data.songs.forEach((song) => {
      idbPromise('songs', 'put', song);
    });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `songs` store
      idbPromise('songs', 'get').then((songs) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_SONGS,
          songs: songs
        });
      });
    }
  }, [data, loading, dispatch]);

function filterSongs() {
  if (!currentGenre) {
    console.log("state.songs", state.songs)
    return state.songs;
  }
  console.log("filter", state.songs.filter(song => song.genre._id === currentGenre._id));

  return state.songs.filter(song => song.genre === currentGenre._id);

}
console.log("currentGenre", currentGenre);

  return (
    <div className={classes.root + ' grid'}>
      <Grid container spacing={2}>
        {state.songs.length ? (
          filterSongs().map(song => (
              <Grid item sm={3} key={song._id}>
                <SongItem
                  _id={song._id}
                  artist={song.artist}
                  image={song.image}
                />
              </Grid>
            ))
      ) : (
        <h3>You haven't added any songs yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
      </Grid>
    </div>
  );
}

export default SongListByGenre;

// Again, we immediately execute the useStoreContext() function to retrieve the current global state object and the dipatch() method to update state. We then destructure the currentGenre data out of the state object so we can use it in the filterSongs() function.

// We then implement the useEffect() Hook in order to wait for our useQuery() response to come in. Once the data object returned from useQuery() goes from undefined to having an actual value, we execute our dispatch() function, instructing our reducer function that it's the UPDATE_SONGS action and it should save the array of song data to our global store. When that's done, useStoreContext() executes again, giving us the song data needed display songs to the page.

// Lastly, we need to update the code in the return statement to use state.songs.length instead of songs.length, since we are now retrieving songs from the state object