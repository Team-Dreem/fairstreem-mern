import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { QUERY_GENRES } from "../utils/queries";
import { ADD_USER, ADD_ARTIST } from "../utils/mutations";
import { UPDATE_GENRES } from "../utils/actions";
import { FormControl, InputLabel, Select, TextField, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import { useStoreContext } from "../utils/GlobalState";

function Signup(props) {
  const [formState, setFormState] = useState({ accountType: "listener", username: "", email: "", password: "", genre: "", bio: "", picture: "", social: "", color: "" });
  const { data: genreData } = useQuery(QUERY_GENRES);
  const [addUser] = useMutation(ADD_USER);
  const [addArtist] = useMutation(ADD_ARTIST);
  const [state, disaptch] = useStoreContext();
  const { genres } = state;

  useEffect(() => {
    disaptch({
      type: UPDATE_GENRES,
      genres: genreData.genres
    });
  }, [genreData]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let mutationResponse = "";
    let token = "";
    if (formState.accountType === "listener") {
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
    else if (formState.accountType === "artist") {
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

      <FormControl fullWidth={true} margin="normal">
        <InputLabel>Account Type</InputLabel>
        <Select
          required
          native
          fullWidth
          onChange={handleChange}
          inputProps={{
            name: 'accountType',
            id: 'accountType',
          }}
        >
          <option value="listener">Listener</option>
          <option value="artist">Artist</option>
        </Select>
      </FormControl>

      <TextField
        className="input"
        required id="standard-required"
        label={formState.accountType === 'artist' ? 'Artist Name' : 'Username'}
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

      {formState.accountType === 'artist' && <FormControl fullWidth={true} margin="normal">
        <InputLabel>Genre</InputLabel>
        <Select
          required
          native
          fullWidth
          onChange={handleChange}
          inputProps={{
            name: 'genre',
            id: 'genre',
          }}>
          {genres.map((genre) => <option value={genre._id} key={genre._id}>{genre.name}</option>)}
        </Select>
      </FormControl>}

      {formState.accountType === 'artist' && <TextField
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
        fullWidth />}

      <Button color="primary" variant="contained" className="btn" onClick={handleFormSubmit}>Sign Up</Button>
    </Container>
  );
}

export default Signup;
