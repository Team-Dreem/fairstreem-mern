import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_SEARCH } from "../../utils/queries";

function Search () {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [timeoutId, setTimeoutId] = useState();
    const [search, { loading, data }] = useLazyQuery(QUERY_SEARCH);

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

        <ul>
            {results.map(result => <li key={ result._id }>{ result.artistName }</li>)}
        </ul>
        </>
    )
};

export default Search;