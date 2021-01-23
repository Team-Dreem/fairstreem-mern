import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



export default function SongTableSimple(props) {
    //use when data is received
    const { artist } = props;
    const songs = artist.songs

    const classes = useStyles();

    function createData( playBtn, name, album, playcount, purchase) {
        return { playBtn, name, album, playcount, purchase };
    }

    function buyClick() {
        console.log("buy clicked");
        //add to cart function here
        console.log(artist);
        console.log('SONGS', songs);
    }

    function playClick(){
        console.log("play clicked");
        
    }
  
    const rows = songs.map((song)=>{
        return createData(
            <Button>
            <PlayArrowIcon onClick={playClick}></PlayArrowIcon>
            </Button>,
            song.title, 1, 2, <Button onClick={buyClick}>Buy</Button>) 
    })

    console.log(rows);

    return (
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
                            <TableCell align="center">
                                {row.playBtn}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">{row.album}</TableCell>
                            <TableCell align="right">{row.playcount}</TableCell>
                            <TableCell align="right">{row.purchase}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}