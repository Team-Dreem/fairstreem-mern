import React from "react";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

import SongCard from '../components/SongCard'
import SongTable from '../components/SongTable'
import SongTableSimple from '../components/SongTableSimple'

import { useMutation, useQuery } from '@apollo/react-hooks';
import {QUERY_ONE_ARTIST} from '../utils/queries'
import { Redirect, useParams } from 'react-router-dom';

import Auth from '../utils/auth';




function ArtistProfile() {
     //useParams retrieves username from URL
  const { artistName } = useParams();
  console.log("USEPARAMS", useParams());
  

    const {loading, data} = useQuery(QUERY_ONE_ARTIST, {
        variables: { artistName: artistName }
      })
      console.log(data, "hellooo???");
      
    const artist = data?.artist

    console.log("ARTIST", artist);
    ;
    
 
      if (loading) {
        return <h2>LOADING...</h2>;
      }

    return (
        <>
            <Grid container justify='center'>
            {/* {artist.artistName} */}
                <h1>{artistName} <span><Button>like</Button></span> </h1>
            </Grid>

            <Grid container justify="center">
                <Grid item md={6} spacing={2}>
                    {/* pass in image src as {artist.avatar} */}
                    <img src="" />

                </Grid>

                <Grid item md={6} spacing={2}>
                    <p>
                        {/* {artist.bio} */}
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>

                </Grid>

            </Grid>

            <Grid container>
                <SongCard></SongCard>
                <SongCard></SongCard>
                <SongCard></SongCard>
                <SongCard></SongCard>
                {/* pass props to songTable artist={artist} */}
                <SongTable ></SongTable>
                <SongTableSimple artist={artist}></SongTableSimple>

            </Grid>
            <Grid container justify="center">
                <h1>COMMENT FEED</h1>
            </Grid>
        </>
    )
}


export default ArtistProfile;




