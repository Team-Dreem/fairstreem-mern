export const UPDATE_SONGS = "UPDATE_SONGS";
export const UPDATE_GENRES = "UPDATE_GENRES";
export const UPDATE_CURRENT_GENRE = "UPDATE_CURRENT_GENRE";
export const UPDATE_ARTISTS = "UPDATE_ARTISTS";

// With these three actions, we're defining how three parts of our state will be maintained and updated:

//UPDATE_SONGS is used by the SongList component. Right now, we're getting all of our song data from the server, and Apollo caches the results. This is great for performance, but it also means we have to go through Apollo every time we want to update that list. The end goal here is to store the data retrieved for songs by Apollo in this global state. This way, we can add offline capabilities later and persist our song data!

//UPDATE_GENRES works a lot like UPDATE_SONGS in that we want to take the list of genres retrieved from the server by Apollo and store it in this global state. Again, this will allow us to easily add offline capabilities at a future point in this project.

//UPDATE_CURRENT_GENRE is sort of the connecting piece of data for the previous two actions we created, in that we want to be able to select a genre from the state created by the UPDATE_GENRES action and display songs for that genre from the list we create from the UPDATE_SONGS action.

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';
