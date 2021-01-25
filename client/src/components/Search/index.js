import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useApolloClient } from "@apollo/react-hooks";
import { QUERY_SEARCH } from "../../utils/queries";
import SearchResults from "../SearchResults";
import GenreMenu from "../GenreMenu";
import SongList from "../SongList";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CURRENT_GENRE } from "../../utils/actions";

function Search () {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [loading, setLoading] = useState(false);
    const apolloClient = useApolloClient();
    const [state, dispatch] = useStoreContext();

    const { currentGenre } = state;

    useEffect(() => {
        if (!searchTerm) {
            dispatch({
                type: UPDATE_CURRENT_GENRE,
                currentGenre: null,
              });
              
            setResults(null);
            return;
        }

        const timeoutId = setTimeout(() => {
            dispatch({
                type: UPDATE_CURRENT_GENRE,
                currentGenre: null,
              });
            
            setLoading(true);

            apolloClient
                .query({ query: QUERY_SEARCH, variables: { term: searchTerm }})
                .then(results => {
                    setResults(results.data.search);
                    setLoading(false);
                });
        }, 150);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm, apolloClient, dispatch]);

    return (
        <>
            <div className="search-bar">
                <SearchBar
                    onChange={setSearchTerm}
                    onCancelSearch={() => setSearchTerm(undefined)} />
            </div>

            <GenreMenu />

            { !searchTerm && currentGenre && <SongList /> }
            { (loading || results) && <SearchResults loading={loading} results={results} /> }
        </>
    )
};

export default Search;