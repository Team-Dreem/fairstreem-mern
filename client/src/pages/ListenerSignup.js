import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { FormControl, TextField, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';



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

      <FormControl onSubmit={handleFormSubmit}>

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

        <Button variant="contained">Submit</Button>
        {/* 
      <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>   */}
      </FormControl>

    </Container>
  );
}

export default Signup;
