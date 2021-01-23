import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Button from "@material-ui/core/Button";

import { useStoreContext } from "../../utils/GlobalState";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function SongTableSimple(item) {
  const [state, dispatch] = useStoreContext();
  const { image, title, _id, price, artist, tags, song_url } = item;
  //use when data is received

  const { currentArtist } = state;

  const addToRow = () => {
      const songItem = currentArtist.find((song) => song.artist === _id);
      console.log("songItem", songItem)
  }
  

  const classes = useStyles();

  function createData(playBtn, name, album, playcount, purchase) {
    return { playBtn, name, album, playcount, purchase };
  }
  console.log(currentArtist);
  console.log("title", title);
  console.log("image", image);
  console.log("_id", _id);
  console.log("price", price);
  console.log("artist", artist);
  console.log("song_url", song_url);
  console.log("tags", tags);

  function buyClick() {
    console.log("buy clicked");
    //add to cart function here
  }

  function playClick() {
    console.log("play clicked");
  }


//   const rows = item.map((song) => {
//     return createData(
//       <Button>
//         <PlayArrowIcon onClick={playClick}></PlayArrowIcon>
//       </Button>,
//       song.title,
//       1,
//       2,
//       <Button onClick={buyClick}>Buy</Button>
//     );
//   });

//   console.log(rows);

  return ( null )
}
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead align="right">
//           <TableRow>
//             <TableCell></TableCell>
//             <TableCell align="left">Title</TableCell>
//             <TableCell align="right">Album</TableCell>
//             <TableCell align="right">Playcount</TableCell>
//             <TableCell align="right">Purchase</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.name}>
//               {/* <TableCell component="th" scope="row">
//                                 {row.name}
//                             </TableCell> */}
//               <TableCell align="center">{row.playBtn}</TableCell>
//               <TableCell align="left">{row.name}</TableCell>
//               <TableCell align="right">{row.album}</TableCell>
//               <TableCell align="right">{row.playcount}</TableCell>
//               <TableCell align="right">{row.purchase}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

export default SongTableSimple;
