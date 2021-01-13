import React, { useEffect, useState } from "react";
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_SONGS,
} from "../utils/actions";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { QUERY_SONGS } from "../utils/queries";
import spinner from "../assets/spinner.gif";
import Cart from "../components/Cart";

function Detail() {
  // const { id } = useParams();

  // const [currentSong, setCurrentSong] = useState({})

  // const { loading, data } = useQuery(QUERY_SONGS);

  // const songs = data?.songs || [];

  // useEffect(() => {
  //   if (songs.length) {
  //     setCurrentSong(songs.find(song => song._id === id));
  //   }
  // }, [songs, id]);
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentSong, setCurrentSong] = useState({});

  const { loading, data } = useQuery(QUERY_SONGS);

  // const { songs } = state;
  const { songs, cart } = state;

  useEffect(() => {
    // already in global store
    if (songs.length) {
      setCurrentSong(songs.find(song => song._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_SONGS,
        songs: data.songs
      });
  
      data.songs.forEach((song) => {
        idbPromise('songs', 'put', song);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('songs', 'get').then((indexedSongs) => {
        dispatch({
          type: UPDATE_SONGS,
          songs: indexedSongs
        });
      });
    }
  }, [songs, data, loading, dispatch, id]);
  

  // const addToCart = () => {
  //   dispatch({
  //     type: ADD_TO_CART,
  //     song: { ...currentSong, purchaseQuantity: 1 }
  //   });
  // };
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        song: { ...currentSong, purchaseQuantity: 1 }
      });
      // if song isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentSong, purchaseQuantity: 1 });
    }
  }
  

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentSong._id
    });
  
    // upon removal from cart, delete the item from IndexedDB using the `currentSong._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentSong });
  };

  return (
    <>
      {currentSong ? (
        <div className="container my-1">
          <Link to="/">← Back to Songs</Link>

          <h2>{currentSong.name}</h2>

          <p>{currentSong.description}</p>

          <p>
            <strong>Price:</strong>${currentSong.price}{" "}
            <button onClick={addToCart}>Add to cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentSong._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentSong.image}`}
            alt={currentSong.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;

// So again, we go through all of the motions of getting the global state, querying data using Apollo and destructuring the songs out of state. But what's going one with the useEffect() Hook? And why do we still have local state? Why isn't the currentSong part of the global state?

// To answer the first question, the useEffect() Hook here has to check for a couple of things. It first checks to see if there's data in our global state's songs array. If there is, we use it to figure out which song is the current one that we want to display. It does this finding the one with the matching _id value that we grabbed from the useParams() Hook. But what happens if we don't have any songs in our global state object? What happens if someone just sent you this song's URL and this is the first time you've loaded this application?

// If that's the case, then you wouldn't have any songs saved in global state just yet. The useEffect() Hook is set up so that if we don't, we'll use the song data that we returned from the useQuery() Hook to set the song data to the global state object. When that's complete, we run through this all over again. But this time, there is data in the songs array, and then we run setCurrentSong() to display a single song's data.

// This is why there are so many items in the second argument of the useEffect() Hook. The Hook's functionality is dependent on them to work and only runs when it detects that they've changed in value! This is known as the dependency array.

// It's a lot of back and forth, but it works! But what about our second question? Why are we saving the current song locally and not to the global state?

// This is one of those cases where saving a single song to the global state object doesn't actually benefit us in any way, shape, or form. The single song's data will only be used in this specific component at this specific moment. This is the same reason why we don't worry about saving form entry data from the login or signup forms to global state; it only needs to exist when we're using those components!

// Okay, now we'll update the useEffect() Hook to check if we have data returning from a global state and stored in songs. Then we'll account for the following possibilities:

// If yes, let's get the current song and save it to the local state currentSong.

// If no, we don't have data in global state, let's check whether we retrieved data from the server using the useQuery() Hook. If yes, save that data to global state and to the song object store in IndexedDB, and we'll run the useEffect() Hook over again to make that first if statement run.

// If no, we don't have data in global state and we don't have a connection to the server, the loading data will be undefined. We'll then go to the song object store in IndexedDB and retrieve the data from there to provide the global state object.

// If this seems like a lot, remember that you'll be making fantastic use of the useEffect() Hook React provides. It will constantly check the dependency array for a change in any of the values listed in it and continue to run the useEffect() Hook's callback function until that data stops changing and you're good to go.


