import React from "react";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import SongCard from '../components/SongCard'
import SongTable from '../components/SongTable'

import { useMutation, useQuery } from '@apollo/react-hooks';
import {QUERY_ARTIST} from '../utils/queries'

import Auth from '../utils/auth';
import Button from '@material-ui/core/Button'



function ArtistProfile() {

    const {loading, data} = useQuery(QUERY_ARTIST)
    const artistData = data?.artist
    // try {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //       return false;
    //     }    
    //   } catch (err) {
    //     console.error(err);
    //   }

      if (loading) {
        return <h2>LOADING...</h2>;
      }

    return (
        <>
            <Grid container justify='center'>
            {/* {artistData.artistName} */}
                <h1>ARTIST NAME <span><Button>like</Button></span> </h1>
            </Grid>

            <Grid container justify="center">
                <Grid item md={6} spacing={2}>
                    <img src="../assets/placeholder-cat.jpg" />

                </Grid>

                <Grid item md={6} spacing={2}>
                    <p>
                        {/* {artistData.bio} */}
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>

                </Grid>

            </Grid>

            <Grid container>
                <SongCard></SongCard>
                <SongCard></SongCard>
                <SongCard></SongCard>
                <SongCard></SongCard>
                <SongTable></SongTable>

            </Grid>
            <Grid container justify="center">
                <h1>COMMENT FEED</h1>
            </Grid>
        </>
    )
}


export default ArtistProfile;




