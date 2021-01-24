import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_SONGS } from "../../utils/queries";
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
import spinner from "../../assets/spinner.gif";

import { useStoreContext } from "../../utils/GlobalState";
import SongCard from "../SongCard";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function SongTableSimple(props) {
  const [state] = useStoreContext();
  const {
    image,
    title,
    _id,
    price,
    artistId,
    description,
    tags,
    song_url,
  } = props;

  const { currentArtist } = state;

  //use when data is received
  const { loading, data } = useQuery(QUERY_SONGS);

  const artistSongs = state.songs.filter(
    (song) => song.artistId === currentArtist._id
  );

  console.log("artistSongs", artistSongs);

  const classes = useStyles();

  function createData(playBtn, name, album, playcount, purchase) {
    return { playBtn, name, album, playcount, purchase };
  }
  // console.log("SongTableArtist", currentArtist);
  // console.log("title", title);
  // console.log("image", image);
  // console.log("_id", _id);
  // console.log("price", price);
  // console.log("artistId", artistId);
  // console.log("description", description);
  // console.log("song_url", song_url);
  // console.log("tags", tags);

  function buyClick() {
    console.log("buy clicked");
    //add to cart function here
  }

  function playClick() {
    console.log("play clicked");
  }

  const rows = artistSongs.map((song) => {
    return createData(
      <Button>
        <PlayArrowIcon onClick={playClick}></PlayArrowIcon>
      </Button>,
      song.title,
      1,
      2,
      <Button onClick={buyClick}>Buy</Button>
    );
  });

  console.log("rows", rows);

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

  function filterSongs() {
    return state.songs.filter((song) => song.artistId === currentArtist._id);
  }

  return (
    <div>
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
      {/* <h2>Songs Sent to SongCard:</h2> */}
      {state.songs.length ? (
        <div className="flex-row">
          {filterSongs().map((song) => (
            <SongCard
              key={song._id}
              _id={song._id}
              title={song.title}
              artistId={song.artistId}
              description={song.description}
              image={song.image}
              price={song.price}
              song_url={song.song_url}
              tags={song.tags}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any songs yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default SongTableSimple;
