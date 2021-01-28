import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '50%',
    margin: 'auto',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  price: {
    marginTop: theme.spacing(2)
  }
}));

const DownloadButton = React.forwardRef(({ songUrl, children, className }, ref) => <a target="_blank" ref={ref} className={className} rel="noopener noreferrer" href={songUrl}>{ children }</a>);

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  console.log("OrderHistory: user", user);

  const classes = useStyles();

  return user ? (
      <Paper className={classes.root} elevation={1}>
        <Link to="/">← Back to Songs</Link>

        <h2>Order History for {user.username}:</h2>
        {user.orders.map((order) => (
          <div key={order._id} className="my-2">
            <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
            <div className="flex-row">
              {order.songs.map(({ _id, image, title, price, song_url }, index) => (
                <div key={index} className="card px-1 py-1">
                  <Link to={`/songs/${_id}`}>
                  <img
                      alt={title}
                      src={`/images/${image}`}
                    />
                    <p>{title}</p>
                  </Link>
                  <Button component={DownloadButton} variant="contained" color="primary" songUrl={song_url}>Download</Button>
                  <p className={classes.price}>${price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Paper>
    ) : null;
};

export default OrderHistory;
