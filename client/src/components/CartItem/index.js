import React from "react";
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART } from "../../utils/actions";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();
  // This component currently gets all of its data as props passed down from Cart. That won't change, but now CartItem will also update the global state to adjust item quantities. Note that we only destructured the dispatch() function from the useStoreContext Hook, because the CartItem component has no need to read state.
  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  // const onChange = (e) => {
  //   const value = e.target.value;

  //   if (value === '0') {
  //     dispatch({
  //       type: REMOVE_FROM_CART,
  //       _id: item._id
  //     });
    
  //     idbPromise('cart', 'delete', { ...item });
  //   } else {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: item._id,
  //       purchaseQuantity: parseInt(value)
  //     });
    
  //     idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
  //   }
  // };

  return (
    <div className="flex-row">
      <div>
        <img src={`${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.title}, ${item.price}
        </div>
        <div>
          {/* <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
            />
            This will also clear up the error that React was throwing earlier, because the onChange handler means that the value of this element can now potentially change and is no longer read-only. Test this out in the browser by adding an item to the cart and then typing a new number in the <input> element. Doing so will automatically update the total dollar amount, because the parent Cart component re-renders whenever the global state is updated. */}
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;