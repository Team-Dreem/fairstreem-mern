import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { UPDATE_ARTISTS, UPDATE_SELECTED_ARTIST } from "../utils/actions";
import { QUERY_ARTISTS, QUERY_ARTIST_BY_PARAMS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import { makeStyles } from '@material-ui/core/styles';
import getLetterAvatar from '../utils/getLetterAvatar';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
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

const useStyles = makeStyles((theme) => ({
  large: {
      width: 250,
      height: 250,
      margin: '50px auto -125px',
      fontSize: 72
  },
  input: {
      display: "none"
  }
}));

function ArtistProfile() {
  const classes = useStyles();
  const [state, dispatch] = useStoreContext();

  const { artistId } = useParams();

  // const { loading: commentLoading, data: commentData } = useQuery(QUERY_ARTIST_BY_PARAMS, {
  //   variables:{_id: artistId }
  // })
  // console.log("COMMENTDATA", commentData);
  

  const { loading, data } = useQuery(QUERY_ARTISTS);

  const selectedArtist = state.artists.find((artist) => artist._id === artistId);
  const self = state.currentArtist
    && selectedArtist
    && state.currentArtist._id === selectedArtist._id;
    
  console.log('self', self);

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
          <Avatar
            src={selectedArtist.avatar}
            className={classes.large}>
            {getLetterAvatar(selectedArtist.artistName)}
          </Avatar>
          <div className="artist-profile">
            
            <div className="artist-profile-header">
            <h1>{selectedArtist.artistName}</h1>
              {/* <LikeButton className="like-btn"></LikeButton> */}
              <Fab size="small" aria-label="like">
                <FavoriteIcon />
              </Fab>
              
            </div>
            <p className="bio">{selectedArtist.bio}</p>
          </div>

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
