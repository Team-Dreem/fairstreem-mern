import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { FormControl, InputLabel, Select, TextField, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import { getOperationRootType } from "graphql";
import GenreMenu from "../components/GenreMenu";


function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (

    <Container maxWidth="sm">


      <Link to="/login">← Go to Login</Link>

      <h2>Sign up to Share Music</h2>
      <Box m={3} /> 
     <div  mt="4"  class=".MuiFormControl-fullWidth	">
      <FormControl onSubmit={handleFormSubmit}>
      <div class=".MuiFormControl-fullWidth	">
        <TextField
        color="primary"
          id="username"
          name="username"
          type="username"
          onChange={handleChange}
          margin="normal"
          label="Enter a Username"
          variant="outlined"
          placeholder="Username"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth />

        <TextField
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          label="Enter your Email Address"
          variant="outlined"
          placeholder="email@test.com"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth />

        <TextField
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          label="Enter a Password"
          placeholder="*****"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          margin="normal"
          fullWidth />

<InputLabel
          margin="normal"
          id="musicgenre"
          shrink id="musicgenre"
          htmlFor="musicgenre">Music Genre
        </InputLabel>
        <Select
          native
          labelId="musicgenre"
          variant="outlined"
          margin="normal"
          // value={state.genreData}
          onChange={handleChange}
          label="Music Genre"
          id="musicgenre"
          fullWidth
          // value={GenreMenu}
        >
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

        <TextField
          id="bio"
          name="bio"
          type="bio"
          onChange={handleChange}
          margin="normal"
          label="Bio"
          variant="outlined"
          multiline
          rowsMax={4}
          placeholder="Tell us about you"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth />

<TextField
          id="picture"
          name="picture"
          type="picture"
          onChange={handleChange}
          label="Upload a Picture"
          variant="outlined"
          placeholder="Your Picture"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth />

<TextField
          id="socialmedia"
          name="socialmedia"
          type="socialmedia"
          onChange={handleChange}
          margin="normal"
          label="Social Media"
          variant="outlined"
          multiline
          rowsMax={4}
          placeholder="List your social media pages"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth />


        <Button variant="contained">Submit</Button>
 </div>
      </FormControl>
</div>
    </Container>
  );
}

export default Signup;
