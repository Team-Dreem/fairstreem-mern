import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { UPDATE_ARTISTS, UPDATE_SELECTED_ARTIST } from "../utils/actions";
import { QUERY_ARTISTS, QUERY_ARTIST_BY_PARAMS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
// import Auth from '../utils/auth'

import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";

import SongTableSimple from "../components/SongTableSimple";
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import LikeButton from '../components/LikeButton'

import AddSongModal from '../components/AddSongModal'

function ArtistProfile() {
  const [state, dispatch] = useStoreContext();

  //artist id with full song data 600b1de66ea21cf63a4db76d
  //useParams retrieves username from URL
  const { artistId } = useParams();

  // const { loading: commentLoading, data: commentData } = useQuery(QUERY_ARTIST_BY_PARAMS, {
  //   variables:{_id: artistId }
  // })
  // console.log("COMMENTDATA", commentData);
  

  const { loading, data } = useQuery(QUERY_ARTISTS);

  // const selectedArtist = state.artists.find((artist) => artist._id === artistId);
  const selectedArtist = state.artists.find((artist) => artist._id === artistId);
  // console.log("data", data);
  // console.log("state.artists", state.artists)
<<<<<<< HEAD
  // console.log("currentArtist", currentArtist);
  console.log("selectedArtist",selectedArtist);
  
=======
  // console.log("selectedArtist", selectedArtist);
>>>>>>> 62b41776a072f87bbd9d2ae7b1955e138e9d2f25

  useEffect(() => {
    if (data && !selectedArtist) {
      dispatch({
        type: UPDATE_ARTISTS,
        artists: data.artists,
      });
      data.artists.forEach((artist) => {
        idbPromise("artists", "put", artist);
      });
    } else if (selectedArtist) {
      dispatch({
        type: UPDATE_SELECTED_ARTIST,
        selectedArtist: selectedArtist,
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

    // return () => {
    //   dispatch({
    //     type: UPDATE_SELECTED_ARTIST,
    //     selectedArtist: {},
    //     // this clears the currenArist object when leaving page(** this mimics "component unmount" **)
    //   });
    // };
  }, [loading, selectedArtist, dispatch, data, artistId]);

  return (
    <>
      {selectedArtist ? (
        <div>
          <Grid container justify="center">
            {/* {artist.artistName} */}
            <h1>
              {selectedArtist.artistName}{" "}
              <span>
                <LikeButton></LikeButton>
              </span>{" "}
            </h1>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item md={6}>
              <img alt="artist" src={selectedArtist.avatar} />
            </Grid>

            <Grid item md={6}>
              <p>{selectedArtist.bio}</p>
            </Grid>
          </Grid>

          <Grid container>
            <AddSongModal></AddSongModal>
            <SongTableSimple />
          </Grid>
          <Grid container justify="center">
            <h1>COMMENT FEED</h1>
           <CommentForm
           artistId={artistId}></CommentForm>
           <CommentList
            comments={selectedArtist.comments}
           
           title={`Comments for ${selectedArtist.artistName}`}
           />
          </Grid>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default ArtistProfile;
