import React, { useEffect } from "react";
import { idbPromise } from "../../utils/helpers";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_GENRES,
  UPDATE_CURRENT_GENRE,
} from "../../utils/actions";
import { QUERY_GENRES } from "../../utils/queries";
import { Button, ButtonGroup } from "@material-ui/core";

// function GenreMenu({ setGenre }) {
function GenreMenu() {
  //   const { data: genreData } = useQuery(QUERY_GENRES);
  //   const genres = GenreData?.genres || [];

  const [state, dispatch] = useStoreContext();

  const { genres } = state;
  //Now when we use this component, we immediately call upon the useStoreContext() Hook to retrieve the current state from the global state object and the dispatch() method to update state. Because we only need the genres array out of our global state, we simply destructure it out of state so we can use it to provide to our returning JSX.
  const { loading, data: genreData } = useQuery(QUERY_GENRES);

  

  useEffect(() => {
    // if genreData exists or has changed from the response of useQuery, then run dispatch()
    if (genreData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for genres to
      dispatch({
        type: UPDATE_GENRES,
        genres: genreData.genres,
      });
      genreData.genres.forEach((genre) => {
        idbPromise("genres", "put", genre);
      });
    } else if (!loading) {
      idbPromise("genres", "get").then((genres) => {
        dispatch({
          type: UPDATE_GENRES,
          genres: genres,
        });
      });
    }

    // return () => {
    //   dispatch({
    //     type: UPDATE_CURRENT_GENRE,
    //     currentGenre: {},
    //   });
    // };
  }, [genreData, loading, dispatch]);

  // Now when this component loads and the response from the useQuery() Hook returns, the useEffect() Hook notices that genreData is not undefined anymore and runs the dispatch() function, setting our genre data to the global state!

  // Remember how the useEffect() Hook works. It is a function that takes two arguments, a function to run given a certain condition, and then the condition. In this case, the function runs immediately on load and passes in our function to update the global state and then the data that we're dependent on, genreData and dispatch. Now, genreData is going to be undefined on load because the useQuery() Hook isn't done with its request just yet, meaning that if statement will not run.

  // But the beauty of the useEffect() Hook is that it not only runs on component load, but also when some form of state changes in that component. So when useQuery() finishes, and we have data in genreData, the useEffect() Hook runs again and notices that genreData exists! Because of that, it does its job and executes the dispatch() function.

  const handleClick = (currentGenreObject) => {
    dispatch({
      type: UPDATE_CURRENT_GENRE,
      currentGenre: currentGenreObject,
    });
  };

  return (
    <div className="genre-menu">
      <ButtonGroup variant="text" aria-label="text primary button group">
      {genres.map((item) => (
        <Button
          key={item._id}
          onClick={() => {
            // setGenre(item._id);
            handleClick({id: item._id});
          }}
        >
          {item.name}
        </Button>
      ))}
      </ButtonGroup>
    </div>
  );
}
export default GenreMenu;
