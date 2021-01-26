import React from 'react';
import { Grid } from "@material-ui/core";
import SearchCard from "../SearchCard";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStoreContext } from '../../utils/GlobalState';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))

function SearchResults() {
    const classes = useStyles();
    const [state] = useStoreContext();
    const { loading, searchResults: results } = state;

    if (loading) {
        return <CircularProgress className="loader"/>
    } else if (results) {
        if (results.length) {
            return (
                <div className={classes.root + ' grid'}>
                    <Grid container spacing={2}>
                        { results.map(result => <Grid item sm={3} key={ result._id }>
                            <SearchCard data={result} />
                            </Grid>)}
                    </Grid>
            </div>
            );
        } else {
            return <p className="no-result">No results found.</p>;
        }
    } else {
        return null;
    }
}

export default SearchResults;