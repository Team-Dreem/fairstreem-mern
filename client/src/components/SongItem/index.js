import React from "react";
import { idbPromise } from "../../utils/helpers";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import "./style.css";

function SongItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, title, _id, price, song_url } = item;

  const { cart } = state;

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        song: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/songs/${_id}`}>
        <img alt={title} src={`/images/${image}`} />
        <p>{title}</p>
      </Link>
      <audio className="audio" controls>
        <source src={song_url} type="audio/mp3" />
      </audio>
      <div>
        <div>
          by {state.currentArtist.artistName} 
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}


export default SongItem;
