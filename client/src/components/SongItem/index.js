import React from "react";
import { idbPromise } from "../../utils/helpers";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function SongItem(item) {
  const [state, dispatch] = useStoreContext();
// console.log('item', item);
  const { image, title, _id, price, song_url } = item;

  // console.log("SongItem image", image);

  const { cart } = state;

  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      return (
        <p>You already have this song in your cart!</p>
      )
    } else {
      dispatch({
        type: ADD_TO_CART,
        song: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        height: 140,
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={`/songs/${_id}`}>
      <CardActionArea>
        <CardMedia className={classes.media} image={item.image} />
        <CardContent>
          <Typography className="artist-name" gutterBottom variant="h5" component="h2">
            { item.artist }
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}


export default SongItem;
