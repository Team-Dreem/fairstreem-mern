import React from "react";
import SongListByGenre from "../components/SongListByGenre";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <GenreMenu />
      <SongListByGenre />
      <Cart />
    </div>
  );
};

export default Home;
