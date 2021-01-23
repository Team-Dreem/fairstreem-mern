import React from "react";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Listen | Connect | Support</h1>
        <h3>Listen to new music while directly supporting the artists who create it</h3>
        <Search />
      </div>
    </div>

  );
};

export default Home;
