import React, { useEffect } from 'react';
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SONGS } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';

import SongItem from "../SongItem";
import { QUERY_SONGS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"



function SongList() {
const [state, dispatch] = useStoreContext();

const { currentGenre } = state;

const { loading, data } = useQuery(QUERY_SONGS);

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
    return state.songs;
  }

  return state.songs.filter(song => song.genre._id === currentGenre);
}

  return (
    <div className="my-2">
      <h2>Songs:</h2>
      {state.songs.length ? (
        <div className="flex-row">
            {filterSongs().map(song => (
                <SongItem
                  key= {song._id}
                  _id={song._id}
                  title={song.title}
                  artist={song.artist}
                  description={song.description}
                  image={song.image}
                  price={song.price}
                  // genre={song.genre}
                  // tags={song.tags}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any songs yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default SongList;

// Again, we immediately execute the useStoreContext() function to retrieve the current global state object and the dipatch() method to update state. We then destructure the currentGenre data out of the state object so we can use it in the filterSongs() function.

// We then implement the useEffect() Hook in order to wait for our useQuery() response to come in. Once the data object returned from useQuery() goes from undefined to having an actual value, we execute our dispatch() function, instructing our reducer function that it's the UPDATE_SONGS action and it should save the array of song data to our global store. When that's done, useStoreContext() executes again, giving us the song data needed display songs to the page.

// Lastly, we need to update the code in the return statement to use state.songs.length instead of songs.length, since we are now retrieving songs from the state object