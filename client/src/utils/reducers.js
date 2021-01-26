import {
  UPDATE_GENRES,
  UPDATE_ARTISTS,
  // UPDATE_USERS,
  UPDATE_SONGS,
  UPDATE_CURRENT_GENRE,
  UPDATE_CURRENT_ARTIST,
  UPDATE_CURRENT_USER,
  UPDATE_CURRENT_SONG,
  UPDATE_SEARCH_TERM,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_SEARCH_LOADING,
  UPDATE_SEARCH_RESULTS,
  UPDATE_SEARCH_GENRE
} from "./actions";

import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ARTISTS:
      return {
        ...state,
        artists: [...action.artists],
      };
    // if action type value is the value of `UPDATE_SONGS`, return a new state object with an updated songs array
    case UPDATE_SONGS:
      return {
        ...state,
        songs: [...action.songs],
      };
    // if action type value is the value of `UPDATE_GENRES`, return a new state object with an updated genres array
    case UPDATE_GENRES:
      return {
        ...state,
        genres: [...action.genres],
      };
    case UPDATE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.currentGenre
      };
      case UPDATE_CURRENT_ARTIST:
      return {
        ...state,
        currentArtist: { ...action.currentArtist },
      };
      case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...action.currentUser },
      };
      case UPDATE_CURRENT_SONG:
      return {
        ...state,
        currentSong: { ...action.currentSong },
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.song],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.songs],
      };
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((song) => {
        return song._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((song) => {
          if (action._id === song._id) {
            song.purchaseQuantity = action.purchaseQuantity;
          }
          return song;
          // Why did we need to use the map() method to create a new array instead of updating state.cart directly?

          // Answer: The original state should be treated as immutable.
        }),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
        searchGenre: null
      };
    case UPDATE_SEARCH_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case UPDATE_SEARCH_GENRE:
      return {
        ...state,
        searchTerm: '',
        searchGenre: action.genre
      };

    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        loading: false,
        searchResults: action.results
      };

    default:
      return state;
  }
};

export function useAppReducer(initialState) {
  return useReducer(reducer, initialState);
}
