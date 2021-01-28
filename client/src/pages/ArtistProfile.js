import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { UPDATE_ARTISTS, UPDATE_SELECTED_ARTIST } from "../utils/actions";
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

import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import LikeButton from '../components/LikeButton'
import Auth from '../utils/auth';

import AddSongModal from '../components/AddSongModal'
import FileUploadButton from "../components/FileUploadButton";
import Paper from "@material-ui/core/Paper";
import SongTableSimple from "../components/SongTableSimple";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
      width: 250,
      height: 250,
      margin: '50px auto -125px',
      fontSize: 72
  },
  input: {
      display: "none"
  },
  sectionHeading: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(6)
  },
  songsContainer: {
    padding: '0 !important',
    marginTop: theme.spacing(6)
  }
}));

function ArtistProfile() {
  const [updateArtistAvatar] = useMutation(UPDATE_ARTIST_AVATAR);
  const classes = useStyles();
  const [state, dispatch] = useStoreContext();
  const profile = Auth.getProfile();
  const isLoggedIn = !!profile;

  const { artistId } = useParams();  

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
        <>
          <Avatar
            src={selectedArtist.avatar}
            className={classes.large}>
            {getLetterAvatar(selectedArtist.artistName)}
          </Avatar>
          <Paper elevation={0} className="artist-profile">
            
            <div className="artist-profile-header">
            <h1>{selectedArtist.artistName}</h1>
            { isSelf ? <FileUploadButton onChange={uploadNewAvatar} /> : <LikeButton /> }
              
            </div>
            <p className="bio">{selectedArtist.bio}</p>
        
            <Container className={classes.songsContainer}>
              <h3 className={classes.sectionHeading}>Songs</h3>
              { isSelf && <AddSongModal /> }
              <SongTableSimple allowPurchase={!isSelf && isLoggedIn} />
            </Container>

            <div>
              <h3 className={classes.sectionHeading}>Comments</h3>
              { isLoggedIn && <CommentForm artistId={artistId}></CommentForm> }

              <CommentList
                comments={selectedArtist.comments}
                />
            </div>
          </Paper>
        </>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
 
    </>
  );
}

export default ArtistProfile;
