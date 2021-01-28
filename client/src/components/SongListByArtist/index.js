import React, { useEffect } from "react";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import SongTableSimple from "../SongTableSimple";
import SongCard from "../SongCard";
import { QUERY_SONGS } from "../../utils/queries";
import { UPDATE_SONGS } from "../../utils/actions";
import spinner from "../../assets/spinner.gif";

function SongListByArtist() {
  const [state, dispatch] = useStoreContext();
  const { selectedArtist } = state;

  // console.log("selectedArtist", selectedArtist);
  const { loading, data } = useQuery(QUERY_SONGS);

  // const songs = data?.songs || [];

  // if (!songs?.length) {
  //   return <h3>There are no song in this artist page!</h3>;
  // }

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
    return state.songs.filter((song) => song.artistId === selectedArtist._id);
  }
  // console.log("filterSongs", filterSongs());
  // console.log("currenArtist._id", selectedArtist._id);

  return (
    <div className="my-2">
      <h2>Sent By Jeff To SongTableSimple from SongListByArtist:</h2>
      {state.songs.length ? (
        <div className="flex-row">
          {filterSongs().map((song) => (
            <SongCard
              key={song._id}
              _id={song._id}
              title={song.title}
              artistId={song.artistId}
              description={song.description}
              image={song.image}
              price={song.price}
              song_url={song.song_url}
              tags={song.tags}
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

// Again, we immediately execute the useStoreContext() function to retrieve the selected global state object and the dipatch() method to update state. We then destructure the selectedArtist data out of the state object so we can use it in the filterSongs() function.

// We then implement the useEffect() Hook in order to wait for our useQuery() response to come in. Once the data object returned from useQuery() goes from undefined to having an actual value, we execute our dispatch() function, instructing our reducer function that it's the UPDATE_SONGS action and it should save the array of song data to our global store. When that's done, useStoreContext() executes again, giving us the song data needed display songs to the page.

// Lastly, we need to update the code in the return statement to use state.songs.length instead of songs.length, since we are now retrieving songs from the state object
