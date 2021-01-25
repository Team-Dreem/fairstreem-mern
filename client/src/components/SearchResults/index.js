import React from 'react';
import { Grid } from "@material-ui/core";
import SearchCard from "../SearchCard";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))

function SearchResults ({ results, loading }) {
    const classes = useStyles();

    if (loading) {
        return <CircularProgress className="loader"/>
    } else if (results && results.length) {
        return (
            <div className={classes.root + ' grid'}>
                <Grid container spacing={2}>
                    { results.map(result => <Grid item sm={3} key={ result._id }>
                        <SearchCard data={result} />
                        </Grid>)}
                </Grid>
        </div>
        );
    } else if (results.length === 0) {
        return <h3 className="no-result">No results for that Artist!</h3>;
    }
}

export default SearchResults;