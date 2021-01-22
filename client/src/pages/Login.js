import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import TextField from '@material-ui/core/TextField';
import { FormControl, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';


function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <Container maxWidth="sm">


      {/* <Link to="/signup">
        ← Go to Signup
      </Link> */}

      <h2>Login</h2>
      <FormControl onSubmit={handleFormSubmit}>

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
          id="pwd"
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

        {
          error ? <div>
            <p className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }

        <Button type="submit" variant="contained">Submit</Button>


      </FormControl>

    </Container>
  );
}


export default Login;
