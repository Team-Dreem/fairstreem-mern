import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER, ADD_ARTIST } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ acctType: "", username: "", email: "", password: "", genre: "", aboutme: "", picture: "", social: "", color: "" });
  const [addUser] = useMutation(ADD_USER);
  const [addArtist] = useMutation(ADD_ARTIST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let mutationResponse = "";
    let token = "";
    if(formState.acctType === "user")
    {
      mutationResponse = await addUser({
        variables: {
          accountType: formState.acctType,
          username: formState.username,
          email: formState.email,
          password: formState.password,
          aboutme: formState.aboutme,
          avatar: formState.picture,
          // firstName: formState.firstName,
          // lastName: formState.lastName,
        },
      });
      token = mutationResponse.data.addUser.token;
    }
    else if(formState.acctType === "artist")
    {
      mutationResponse = await addArtist({
        variables: {
          accountType: formState.acctType,
          artistName: formState.username,
          email: formState.email,
          password: formState.password,
          genre: formState.genre,
          aboutme: formState.aboutme,
          avatar: formState.picture,
          socialMedia: formState.social,
          // firstName: formState.firstName,
          // lastName: formState.lastName,
        },
      });
      token = mutationResponse.data.addArtist.token;
    }
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // Expecting Account type to change to some alternate form of selection and Genre to change to dropdown.
  // Account type will need to cause Genre and Social Media Links to appear, if artist is selected.
  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="flex-row space-between my-2">
          <label htmlFor="type">*Account Type:</label>
          <input
            placeholder="user or artist"
            name="acctType"
            type="acctType"
            id="type"
            onChange={handleChange}
          />
      </div>
      <div className="flex-row space-between my-2">
          <label htmlFor="username">*Username:</label>
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div> */}
        <div className="flex-row space-between my-2">
          <label htmlFor="email">*Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">*Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="genre">*Genre:</label>
          <input
            placeholder="country"
            name="genre"
            type="genre"
            id="genre"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="aboutme">About Me:</label>
          <input
            placeholder="Tell us about yourself"
            name="aboutme"
            type="aboutme"
            id="aboutme"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="picture">Picture:</label>
          <input
            placeholder=""
            name="picture"
            type="picture"
            id="picture"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="social">Other Social Media:</label>
          <input
            placeholder="LinkedIn, Facebook, Twitter, ect."
            name="social"
            type="social"
            id="social"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
