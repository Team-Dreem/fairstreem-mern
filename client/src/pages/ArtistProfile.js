import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { UPDATE_ARTISTS, UPDATE_CURRENT_ARTIST } from "../utils/actions";
import { QUERY_ARTISTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import SongTableSimple from "../components/SongTableSimple";

function ArtistProfile() {
  const [state, dispatch] = useStoreContext();
  //useParams retrieves username from URL
  const { artistId } = useParams();

  const { loading, data } = useQuery(QUERY_ARTISTS);

  const currentArtist = state.artists.find((artist) => artist._id === artistId);

  useEffect(() => {
    if (data && !currentArtist) {
      dispatch({
        type: UPDATE_ARTISTS,
        artists: data.artists,
      });
      data.artists.forEach((artist) => {
        idbPromise("artists", "put", artist);
      });
    } else if (currentArtist) {
      dispatch({
        type: UPDATE_CURRENT_ARTIST,
        currentArtist,
      });
      // get cache from idb
    } else if (!loading) {
      idbPromise("artists", "get").then((indexedArtists) => {
        dispatch({
          type: UPDATE_ARTISTS,
          artists: indexedArtists,
        });
      });
    }

    return () => {
      dispatch({
        type: UPDATE_CURRENT_ARTIST,
        currentArtist: {},
        // this clears the currenArist object when leaving page(** this mimics "component unmount" **)
      });
    };
  }, [loading, currentArtist, dispatch, data, artistId]);

  return (
    <>
      {currentArtist ? (
        <div>
          <Grid container justify="center">
            {/* {artist.artistName} */}
            <h1>
              {currentArtist.artistName}{" "}
              <span>
                <Button>like</Button>
              </span>{" "}
            </h1>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item md={6}>
              <img alt="artist" src={currentArtist.avatar} />
            </Grid>

            <Grid item md={6}>
              <p>{currentArtist.bio}</p>
            </Grid>
          </Grid>

          <Grid container>
            {/* <SongCard>
              {" "} */}
            <SongTableSimple />
          </Grid>
          <Grid container justify="center">
            <h1>COMMENT FEED</h1>
          </Grid>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default ArtistProfile;
