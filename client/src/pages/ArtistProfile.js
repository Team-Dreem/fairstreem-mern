import React, { useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_ARTISTS } from "../utils/actions";
import { QUERY_ARTISTS, QUERY_ONE_ARTIST } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import SongCard from "../components/SongCard";

import SongTableSimple from "../components/SongTableSimple";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link, Redirect, useParams } from "react-router-dom";

import Auth from "../utils/auth";

function ArtistProfile() {
  const [state, dispatch] = useStoreContext();
  //useParams retrieves username from URL
  const { artistName } = useParams();

  const [currentArtist, setCurrentArtist] = useState({});
  console.log("USEPARAMS", useParams());

  //   const { loading, data } = useQuery(QUERY_ONE_ARTIST, {
  //     variables: { artistName: artistName },
  //   });
  const { loading, data } = useQuery(QUERY_ARTISTS);

  const { artists } = state;

  //   const artist = data?.artist;

  useEffect(() => {
    // already in global store
    if (artists.length) {
      setCurrentArtist(
        artists.find((artist) => artist.artistName === artistName)
      );
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_ARTISTS,
        artists: data.artists,
      });

      data.artists.forEach((artist) => {
        idbPromise("artists", "put", artist);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("artists", "get").then((indexedArtists) => {
        dispatch({
          type: UPDATE_ARTISTS,
          products: indexedArtists,
        });
      });
    }
  }, [artists, data, loading, dispatch, artistName]);

  console.log("ARTISTS", artists);
  console.log("currentArtist", currentArtist);
  console.log("currentArtist.songs", currentArtist.songs);
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

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

          <Grid container justify="center">
            <Grid item md={6} spacing={2}>
              <img src={currentArtist.avatar} />
            </Grid>

            <Grid item md={6} spacing={2}>
              <p>
                {/* {artist.bio} */}
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </Grid>
          </Grid>

          <Grid container>
            <SongCard></SongCard>
            <SongCard></SongCard>
            <SongCard></SongCard>
            <SongCard></SongCard>
            <SongTableSimple artist={currentArtist.songs}></SongTableSimple>
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
