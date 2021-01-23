import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_SONGS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
// import "./style.css";
import { UPDATE_SONGS } from "../../utils/actions";


function SongListItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, title, _id, price, artist, description, tags, song_url } = item;

  const { currentArtist } = state;

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
    if (!currentArtist) {
      return state.songs;
    }

    return state.songs.filter((song) => song.artist._id === currentArtist);
  }
  return (
    <div className="card px-1 py-1">
      <Link to={`/songs/${_id}`}>
        <img alt={title} src={`/images/${image}`} />
        <p>{title}</p>
      </Link>
      <audio className="audio" controls>
        <source src={song_url} type="audio/mp3" />
      </audio>
      <div>
        <div>by {artist}</div>
        <span>${price}</span>
      </div>
      <div>{description}</div>
      <button >A Button</button>
    </div>
  );
}

export default SongListItem;
