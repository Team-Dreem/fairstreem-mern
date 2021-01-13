import React from "react";
import SongList from "../components/SongList";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

// const Home = () => {
//   const [currentGenre, setGenre] = useState("");

//   return (
//     <div className="container">
//       <GenreMenu setGenre={setGenre} />
//       <SongList currentGenre={currentGenre} />
//     </div>
//   );
// };

const Home = () => {
  return (
    <div className="container">
      <GenreMenu />
      <SongList />
      <Cart />
    </div>
  );
};
// Notice how much cleaner this component looks? Before, when it was managing state to be used by other components, it didn't even get to use that data! Now all this component has to concern itself with is displaying the other components, which makes it much easier to build upon in the future.

export default Home;
