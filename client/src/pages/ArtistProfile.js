import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { UPDATE_ARTISTS, UPDATE_SELECTED_ARTIST, UPDATE_ARTIST_AVATAR_IN_CACHE } from "../utils/actions";
import { QUERY_ARTISTS } from "../utils/queries";
import { UPDATE_ARTIST_AVATAR } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { makeStyles } from '@material-ui/core/styles';
import getLetterAvatar from '../utils/getLetterAvatar';
import Avatar from '@material-ui/core/Avatar';
import spinner from "../assets/spinner.gif";
import Grid from "@material-ui/core/Grid";
import { useMutation } from "@apollo/react-hooks";
import { post } from 'axios';

import SongTableSimple from "../components/SongTableSimple";
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import LikeButton from '../components/LikeButton'

import AddSongModal from '../components/AddSongModal'
import FileUploadButton from "../components/FileUploadButton";

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
  const [updateArtistAvatar] = useMutation(UPDATE_ARTIST_AVATAR);
  const classes = useStyles();
  const [state, dispatch] = useStoreContext();

  const { artistId } = useParams();

  // const { loading: commentLoading, data: commentData } = useQuery(QUERY_ARTIST_BY_PARAMS, {
  //   variables:{_id: artistId }
  // })
  // console.log("COMMENTDATA", commentData);
  

  const apolloClient = useApolloClient();
  const { loading, data } = useQuery(QUERY_ARTISTS);

  const selectedArtist = state.artists.find((artist) => artist._id === artistId);
  const isSelf = state.currentArtist
    && selectedArtist
    && state.currentArtist._id === selectedArtist._id;
    
  const uploadNewAvatar = (files) => {
    if (files.length === 0) {
        return;
    }

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const url = "/api/v1/image-upload";
    const formData = new FormData();
    formData.append("image", files[0]);

    post(url, formData, config)
        .then((response) => {
            return updateArtistAvatar({
                variables: {
                    avatarUrl: response.data.imageUrl
                }
            });
        })
        .then(() => {
          return apolloClient.query({
            query: QUERY_ARTISTS
          });
        })
        .then(({ data }) => {
          const { artists } = data;
          
          dispatch({
            type: UPDATE_ARTISTS,
            artists
          });
        });
  };

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
            { isSelf ? <FileUploadButton onChange={uploadNewAvatar} /> : <LikeButton /> }
              
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
