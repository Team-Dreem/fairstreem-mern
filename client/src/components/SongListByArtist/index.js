import React, { useEffect, useState } from "react";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import SongListItem from "../SongListItem";
import SongTableSimple from "../SongTableSimple";
import { QUERY_SONGS } from "../../utils/queries";
import { UPDATE_SONGS } from "../../utils/actions";
import spinner from "../../assets/spinner.gif";

function SongListByArtist() {
  const [state, dispatch] = useStoreContext();
//   const [currentArtist, setCurrentArtist] = useState({});
const { currentArtist } = state;

  console.log("currentArtist", currentArtist);
//   const { loading, data } = useQuery(QUERY_ARTISTS);
//   const { artists } = state;
//   const { id } = useParams();

//   useEffect(() => {
//     // already in global store
//     if (artists.length) {
//       setCurrentArtist(artists.find((artist) => artist._id === id));
//     }
//     // retrieved from server
//     else if (data) {
//       dispatch({
//         type: UPDATE_ARTISTS,
//         artists: data.artists,
//       });

//       data.artists.forEach((artist) => {
//         idbPromise("artists", "put", artist);
//       });
//     }
//     // get cache from idb
//     else if (!loading) {
//       idbPromise("artists", "get").then((indexedArtists) => {
//         dispatch({
//           type: UPDATE_ARTISTS,
//           ARTISTs: indexedArtists,
//         });
//       });
//     }
//   }, [artists, data, loading, dispatch, id]);

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
    if (!currentArtist) {
      return state.songs;
    }

    return state.songs.filter((song) => song.artist === currentArtist);
  }
  console.log("state.songs", state.songs)

  return (
    <div className="my-2">
      <h2>Songs:</h2>
      {state.songs.length ? (
        <div className="flex-row">
          {filterSongs().map((song) => (
            <SongTableSimple
              key={song._id}
              _id={song._id}
              title={song.title}
              artist={song.artist}
              description={song.description}
              image={song.image}
              price={song.price}
              song_url={song.song_url}
              // artist={song.artist}
              // tags={song.tags}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any songs yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default SongListByArtist;

// Again, we immediately execute the useStoreContext() function to retrieve the current global state object and the dipatch() method to update state. We then destructure the currentArtist data out of the state object so we can use it in the filterSongs() function.

// We then implement the useEffect() Hook in order to wait for our useQuery() response to come in. Once the data object returned from useQuery() goes from undefined to having an actual value, we execute our dispatch() function, instructing our reducer function that it's the UPDATE_SONGS action and it should save the array of song data to our global store. When that's done, useStoreContext() executes again, giving us the song data needed display songs to the page.

// Lastly, we need to update the code in the return statement to use state.songs.length instead of songs.length, since we are now retrieving songs from the state object
