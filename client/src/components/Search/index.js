import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_SEARCH } from "../../utils/queries";
import { Grid } from "@material-ui/core";
import SearchCard from "../SearchCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))

function Search () {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [timeoutId, setTimeoutId] = useState();
    const [search, { loading, data }] = useLazyQuery(QUERY_SEARCH);
    const classes = useStyles();

    useEffect(() => {
        clearTimeout(timeoutId);

        if (!searchTerm) {
            setResults([]);
            return;
        }

        const id = setTimeout(() => {
            search({ variables: { term: searchTerm }});
        }, 200);

        setTimeoutId(id);
    }, [searchTerm]);

    useEffect(() => {
        if (loading) {
            return;
        }

        setResults(data && data.search ? data.search : []);
    }, [loading, data]);

    return (
        <>
        <div className="search-bar">
          <SearchBar
          onChange={setSearchTerm}
          onCancelSearch={() => setSearchTerm(undefined)}
          />
        </div>

        <div className={classes.root} className="grid">
       <Grid container spacing={2}>
           { results.map(result => <Grid item sm={3} key={ result._id }>
               <SearchCard data={result} />
            </Grid>)}
       </Grid>
       </div>
        </>
    )
};

export default Search;