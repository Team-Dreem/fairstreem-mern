import React, { useEffect } from "react";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/react-hooks";
import SongCard from "../SongCard";
import { QUERY_SONGS, QUERY_CHECKOUT } from "../../utils/queries";
import { UPDATE_CART_QUANTITY, ADD_TO_CART } from "../../utils/actions";
import { useLazyQuery } from '@apollo/react-hooks';
import { loadStripe } from "@stripe/stripe-js";
import spinner from "../../assets/spinner.gif";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Button from "@material-ui/core/Button";
import PlayButton from '../PlayButton'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

// const Styles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     padding: "1rem",
//     margin: ".5rem",
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   content: {
//     flex: "1 0 auto",
//   },
//   cover: {
//     width: 151,
//   },
//   controls: {
//     display: "flex",
//     alignItems: "center",
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   playIcon: {
//     height: 38,
//     width: 38,
//   },
//   button: {
//     display: "flex",
//     alignItems: "flex-end",
//   },
// }));

const SongRow = (song) => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { songData }] = useLazyQuery(QUERY_CHECKOUT);

const { selectedArtist, cart } = state;

const { _id, title, description, image, price, song_url, tags } = song;

const addToCart = () => {
  console.log("buy clicked");
const itemInCart = cart.find((cartItem) => cartItem._id === _id);
 // if there was a match, call UPDATE with a new purchase quantity
 if (itemInCart) {
  dispatch({
    type: UPDATE_CART_QUANTITY,
    _id: _id,
    purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  });
  idbPromise("cart", "put", {
    ...itemInCart,
    purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
  });
} else {
  dispatch({
    type: ADD_TO_CART,
    product: { ...song },
  });
  idbPromise("cart", "put", { ...song });
}
};

console.log("selectedArtist", selectedArtist);

  // const { image, title, _id, price, artistId, tags, song_url } = props;
  console.log("SongRowArtist", state.selectedArtist);
  console.log("title", title);
  // console.log("image", image);
  // console.log("_id", _id);
  // console.log("price", price);
  // console.log("artistId", artistId);
  console.log("description", description);
  // console.log("song_url", song_url);
  // console.log("tags", tags);

  const classes = useStyles();

  function createData(playBtn, name, album, playcount, purchase) {
    return { playBtn, name, album, playcount, purchase };
  }

//   const theme = useTheme();
//   const classes = useStyles();

  function playClick() {
    console.log("play clicked");
  }

  const artistSongs = state.songs.filter(
    (song) => song.artistId === selectedArtist._id
  );
  console.log("selectedArtist._id", selectedArtist._id);
  console.log("artistSongs", artistSongs);

  const rows = artistSongs.map((song) => {
    return createData(
      // <PlayButton song_url={song.song_url}></PlayButton>,
        <audio controls> 
        <source src={song.song_url} type="audio/ogg"/>
       <source src={song.song_url} type="audio/mpeg"/>
      </audio>
     ,
      // <Button></Button>,
      song.title,
      song.album,
      2,
      <Button onClick={addToCart}>Buy</Button>
    );
  });

  return (
    <div>
    <h2>Songs by {selectedArtist.artistName}:</h2>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead align="right">
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="right">Album</TableCell>
              <TableCell align="right">Playcount</TableCell>
              <TableCell align="right">Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                {/* <TableCell component="th" scope="row">
                                  {row.name}
                              </TableCell> */}
                <TableCell align="center">{row.playBtn}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.album}</TableCell>
                <TableCell align="right">{row.playcount}</TableCell>
                <TableCell align="right">{row.purchase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  );
}

export default SongRow;
