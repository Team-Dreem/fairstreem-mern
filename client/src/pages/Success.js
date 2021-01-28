import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const songs = cart.map((item) => item._id);
      console.log("Success: songs to saveOrder:", songs);

      if (songs.length) {
        const { data } = await addOrder({ variables: { songs } });
        console.log("Success: data", data);
        const songData = data.addOrder.songs;
  
        console.log("Success: songData in saveOrder:", songData);

        songData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }
      setTimeout(function () {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You may download your songs via the order history tab at any time!</h2>
        <h2>You will now be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
