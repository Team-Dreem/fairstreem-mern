import React from "react";
import SongList from "../components/SongList";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <GenreMenu />
      <SongList />
      <Cart />
    </div>
  );
};

export default Home;
