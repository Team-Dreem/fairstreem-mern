import React, { useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useApolloClient } from "@apollo/react-hooks";
import { QUERY_SEARCH, QUERY_ARTIST_BY_GENRE } from "../../utils/queries";
import SearchResults from "../SearchResults";
import GenreMenu from "../GenreMenu";
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_SEARCH_TERM, UPDATE_SEARCH_LOADING, UPDATE_SEARCH_RESULTS } from "../../utils/actions";

function Search () {
    const apolloClient = useApolloClient();
    const [state, dispatch] = useStoreContext();
    let timeoutId;
    const { searchGenre, searchTerm } = state;

    const updateSearchTerm = (searchTerm) => {
        clearTimeout(timeoutId);

        if (!searchTerm) {
            dispatch({
                type: UPDATE_SEARCH_TERM,
                searchTerm: null
              });

            return;
        }

        timeoutId = setTimeout(() => {
            dispatch({
                type: UPDATE_SEARCH_TERM,
                searchTerm,
              });
        }, 150);
    };

    useEffect(() => {
        let query, variables;

        if (searchGenre) {
            query = QUERY_ARTIST_BY_GENRE;
            variables = { genre: searchGenre };
        } else if (searchTerm) {
            query = QUERY_SEARCH;
            variables = { term: searchTerm };
        } else {
            dispatch({
                type: UPDATE_SEARCH_RESULTS,
                results: null
            });

            return;
        }

        dispatch({
            type: UPDATE_SEARCH_LOADING,
            loading: true
        });

        apolloClient
                .query({ query, variables })
                .then(r => {
                    let results;

                    if (query === QUERY_ARTIST_BY_GENRE) {
                        results = r.data.artistsByGenre;
                    } else {
                        results = r.data.search;
                    }

                    dispatch({
                        type: UPDATE_SEARCH_RESULTS,
                        results
                    });
                });

    }, [searchGenre, searchTerm, dispatch, apolloClient]);

    return (
        <>
            <div className="search-bar">
                <SearchBar
                    value={searchTerm}
                    onChange={updateSearchTerm}
                    onCancelSearch={() => updateSearchTerm(null)} />
            </div>

            <GenreMenu />

            <SearchResults />
        </>
    )
};

export default Search;