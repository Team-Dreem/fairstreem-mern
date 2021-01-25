import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

import SongCard from "../components/SongCard";

import { QUERY_SONGS } from "../utils/queries";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_SONGS, UPDATE_CURRENT_SONG } from "../utils/actions";

const SongDetail = () => {
  const [state, dispatch] = useStoreContext();
  const { songId } = useParams();
  // const [currentSong, setCurrentSong] = useState({});

  // const { data: songData } = useQuery(QUERY_SONGS);
  const { loading, data } = useQuery(QUERY_SONGS);

  const currentSong = state.songs.find(song => song._id === songId);

  // const songs = songData?.songs || [];

  useEffect(() => {
    if (data && !currentSong) {
      dispatch({
        type: UPDATE_SONGS,
        songs: data.songs,
      })
     } else if (currentSong) {
      dispatch({
        type: UPDATE_CURRENT_SONG,
        currentSong
      });
     }

    return () => {
      dispatch({
        type: UPDATE_CURRENT_SONG,
        currentSong: {}
    });
  }
}, [loading, currentSong, dispatch, data]);

  return (
    <main>
      <div className="m-5">
        {currentSong ? <SongCard {...currentSong} /> : <h2>Loading...</h2>}
      </div>
    </main>
  );
};

export default SongDetail;
