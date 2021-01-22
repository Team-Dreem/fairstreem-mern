import React from "react";
import SearchBar from "material-ui-search-bar";
import SongList from "../components/SongList";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="hero">
      <h1>Listen. Connect. Support.</h1>
      <h3>Listen to new music while directly supporting the artists who create it</h3>
      <div className="search-bar">
      <SearchBar
        // value={this.state.value}
        // onChange={(newValue) => this.setState({ value: newValue })}
        // onRequestSearch={() => doSomethingWith(this.state.value)}
      />
      </div>
    </div>
  );
};

export default Home;
