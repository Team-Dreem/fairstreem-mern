import React from "react";
import SongListByGenre from "../components/SongListByGenre";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <Link to="/artist/600b1de66ea21cf63a4db76d">Jeff's Artist Page</Link>
      <GenreMenu />
      <SongListByGenre />
      <Cart />
    </div>
  );
};

export default Home;
