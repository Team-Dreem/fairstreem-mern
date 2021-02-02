import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FOLLOW, ADD_FOLLOWER } from "../../utils/mutations";
import { useStoreContext } from "../../utils/GlobalState";

import Auth from "../../utils/auth";

import Fab from "@material-ui/core/Fab";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function LikeButton() {
  const [state] = useStoreContext();
  const [addFollow, { error }] = useMutation(ADD_FOLLOW);
  const [addFollower, { error: artistError }] = useMutation(ADD_FOLLOWER);

  const profile = Auth.getProfile();

  // if not logged in, don't show like button
  if (!profile) {
    return null;
  }

  const listenerId = profile.data._id || null;

  //add Artist to User
  async function addFollowFunction() {
    try {
      await addFollow({
        variables: { artistId: state.selectedArtist._id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  //     //add User to Artist
  async function addFollowerFunction() {
    try {
      await addFollower({
        variables: { artistId: state.selectedArtist._id },
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Fab
      size="small"
      aria-label="like"
      onClick={() => {
        console.log("selected ARTIST", state.selectedArtist);
        console.log("LISTENERID", listenerId);
        addFollowFunction();
        addFollowerFunction();
      }}
    >
      <FavoriteIcon />
      {error ? (
        <div>
          <p className="error-text">Something went wrong.</p>
        </div>
      ) : null}
      {artistError ? (
        <div>
          <p className="error-text">Something went wrong.</p>
        </div>
      ) : null}
    </Fab>
  );
}
