import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER, ADD_ARTIST } from "../utils/mutations";
import { FormControl, InputLabel, Select, TextField, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Signup(props) {
  const [formState, setFormState] = useState({ acctType: "", username: "", email: "", password: "", genre: "", bio: "", picture: "", social: "", color: "" });
  const [addUser] = useMutation(ADD_USER);
  const [addArtist] = useMutation(ADD_ARTIST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let mutationResponse = "";
    let token = "";
    if (formState.acctType === "user") {
      mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          bio: formState.bio,
          avatar: formState.picture,
        },
      });
      token = mutationResponse.data.addUser.token;
    }
    else if (formState.acctType === "artist") {
      mutationResponse = await addArtist({
        variables: {
          artistName: formState.username,
          email: formState.email,
          password: formState.password,
          genre: formState.genre,
          bio: formState.bio,
          avatar: formState.picture,
          socialMedia: formState.social,
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
    <Container maxWidth="sm" className="signup-form">

      <h2>Signup</h2>

      <Box m={3} />

      <FormControl fullWidth={true} onSubmit={handleFormSubmit}>
        <InputLabel>Account Type</InputLabel>
        <Select
          required
          margin="normal"
          native
          fullWidth
          onChange={handleChange}
          inputProps={{
            name: 'accType',
            id: 'accType',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Listener</option>
          <option value={20}>Artist</option>
        </Select>
      </FormControl>

      <TextField
        className="input"
        required id="standard-required"
        label="Username"
        fullWidth
        margin="normal"
        name="username"
        type="username"
        onChange={handleChange}
      />

      <TextField
        className="input"
        required id="standard-required"
        label="Email Address"
        fullWidth
        margin="normal"
        name="email"
        type="email"
        onChange={handleChange}
      />

      <TextField
        className="input"
        required id="standard-required"
        label="Password"
        fullWidth
        margin="normal"
        name="password"
        type="password"
        id="pwd"
        onChange={handleChange}
      />

      <FormControl fullWidth={true} margin="normal">
        <InputLabel>Genre</InputLabel>
        <Select
          required
          margin="normal"
          native
          fullWidth
          onChange={handleChange}
          inputProps={{
            name: 'genre',
            id: 'genre',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Rock</option>
          <option value={20}>Classical</option>
          <option value={30}>Jazz</option>
          <option value={40}>Country</option>
          <option value={50}>Pop</option>
          <option value={60}>Hip Hop</option>
          <option value={70}>Folk</option>
          <option value={80}>Heavy Metal</option>
          <option value={90}>Reggae</option>
        </Select>
      </FormControl>

      <TextField
        className="input"
        id="bio"
        name="bio"
        type="bio"
        onChange={handleChange}
        margin="normal"
        label="Bio"
        multiline
        rowsMax={4}
        placeholder="Tell us about you"
        fullWidth />

      <TextField
        className="input"
        id="picture"
        name="picture"
        type="picture"
        onChange={handleChange}
        margin="normal"
        label="Post a picture"
        fullWidth />

      <Button variant="contained" className="btn">Submit</Button>
    </Container>
  );
}

export default Signup;
