import React, { useEffect } from "react";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_SONGS } from "../../utils/queries";
import {
  UPDATE_SONGS,
  ADD_TO_CART,
} from "../../utils/actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    background: "rgba(0,0,0,.05)",
  },
  noSong: {
    margin: theme.spacing(1),
  },
}));

function SongTableSimple({ allowPurchase = true }) {
  const classes = useStyles();
  const [state, dispatch] = useStoreContext();

  const { selectedArtist, cart } = state;

  //use when data is received
  const { loading, data } = useQuery(QUERY_SONGS);

  const addToCart = (song) => {
    console.log("buy clicked", song);
    const itemInCart = cart.find((cartItem) => cartItem._id === song._id);
    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      alert("You already have this song in your cart!");
      return;
      // dispatch({
      //   type: UPDATE_CART_QUANTITY,
      //   _id: song._id,
      //   purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      // });
      // idbPromise("cart", "put", {
      //   ...itemInCart,
      //   purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      // });
    } else {
      dispatch({
        type: ADD_TO_CART,
        song: { ...song, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...song });
    }
  };

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

  const artistSongs = filterSongs();

  return artistSongs && artistSongs.length ? (
    <TableContainer elevation={0} square={true} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead align="right">
          <TableRow className={classes.tableHead}>
            <TableCell></TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="right">Purchase</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artistSongs.map((song) => (
            <TableRow key={song._id}>
              <TableCell align="center">
                <audio controls controlsList="nodownload">
                  <source src={song.song_url} type="audio/ogg" />
                  <source src={song.song_url} type="audio/mpeg" />
                </audio>
              </TableCell>
              <TableCell align="left">{song.title}</TableCell>
              <TableCell align="right">
                <Button onClick={addToCart.bind(this, song)}>Buy</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <p className={classes.noSong}>
      {selectedArtist.artistName} hasn't added any songs yet!
    </p>
  );
}

export default SongTableSimple;
