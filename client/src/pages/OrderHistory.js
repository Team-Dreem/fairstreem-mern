import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  console.log("OrderHistory: user", user);

  return (
    <>
      <div className="container my-1">
        <Link to="/">
          ← Back to Songs
          </Link>

        {user ? (
          <>
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
                      <Link target="FairStreem DL" to={song_url}><button>Download</button>
                      </Link>
                      <div>
                        <span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}

      </div>

    </>)

};

export default OrderHistory;
