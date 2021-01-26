import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { FormControl, TextField, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



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

      <Link to="/login">←Go to Login</Link>

      <h2>Sign up to Listen to Music</h2>

      <Box m={3} />
      <div mt="4" class=".MuiFormControl-fullWidth	">
        <FormControl onSubmit={handleFormSubmit}>
          <div class=".MuiFormControl-fullWidth	">

            <TextField
              id="username"
              name="username"
              type="username"
              onChange={handleChange}
              margin="normal"
              // class="outlined-basic" 
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
              // class="outlined-basic" 
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
              // class="outlined-basic" 
              label="Enter a Password"
              placeholder="*****"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              margin="normal"
              fullWidth />

            <Divider component="div" />
            <div>
              <Typography
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Optional Information
        </Typography>
            </div>

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
              // class="outlined-basic" 
              label="Upload a Picture"
              variant="outlined"
              placeholder="Your Picture"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              fullWidth />

            <Button variant="contained">Submit</Button>

          </div>
        </FormControl>
      </div>
    </Container>
  );
}

export default Signup;
