import React from 'react';
import { Grid } from "@material-ui/core";
import SearchCard from "../SearchCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))

function SearchResults ({ results }) {
    const classes = useStyles();

    return (
        <div className={classes.root + ' grid'}>
       <Grid container spacing={2}>
           { results.map(result => <Grid item sm={3} key={ result._id }>
               <SearchCard data={result} />
            </Grid>)}
       </Grid>
       </div>
    )
}

export default SearchResults;