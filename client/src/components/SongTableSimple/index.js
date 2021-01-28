import React, { useEffect } from "react";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import SongRow from "../SongRow";
import { QUERY_SONGS, QUERY_CHECKOUT } from "../../utils/queries";
import { UPDATE_SONGS } from "../../utils/actions";
import { loadStripe } from "@stripe/stripe-js";
import spinner from "../../assets/spinner.gif";

import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

function SongTableSimple({ allowPurchase = true }) {
  const [state, dispatch] = useStoreContext();

  const { selectedArtist } = state;

  //use when data is received
  const { loading, data } = useQuery(QUERY_SONGS);
//   console.log("STSselectedArtist", selectedArtist);
// console.log("STSdata", data);
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
  console.log("filterSongs", filterSongs());

  // console.log("SongTableArtist", selectedArtist);
  // console.log("title", title);
  // console.log("image", image);
  // console.log("_id", _id);
  // console.log("price", price);
  // console.log("artistId", artistId);
  // console.log("description", description);
  // console.log("song_url", song_url);
  // console.log("tags", tags);

  function playClick() {
    console.log("play clicked");
  }

  const artistSongs = state.songs.filter(
    (song) => song.artistId === selectedArtist._id
  );

  return (
   
    <div>    
      {artistSongs.length ? (
        <div className="flex-row">
          {filterSongs().map((song) => (
            <SongRow
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
        <h3>{selectedArtist.artistName} hasn't added any songs yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default SongTableSimple;
