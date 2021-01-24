import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useApolloClient } from "@apollo/react-hooks";
import { QUERY_SEARCH } from "../../utils/queries";
import { Grid } from "@material-ui/core";
import SearchCard from "../SearchCard";
import { makeStyles } from "@material-ui/core/styles";
import GenreMenu from "../GenreMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))

function Search () {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const apolloClient = useApolloClient();
    const classes = useStyles();

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            apolloClient
                .query({ query: QUERY_SEARCH, variables: { term: searchTerm }})
                .then(results => {
                    setResults(results.data.search);
                })
        }, 150);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm, apolloClient]);

    return (
        <>
        <div className="search-bar">
          <SearchBar
          onChange={setSearchTerm}
          onCancelSearch={() => setSearchTerm(undefined)}
          />
        </div>
        <GenreMenu />

        <div className={classes.root + ' grid'}>
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