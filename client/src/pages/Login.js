import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN, ARTIST_LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import TextField from '@material-ui/core/TextField';
import { FormControl, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '', accountType: '' });
  const [login, { error }] = useMutation(LOGIN);
  const [artistLogin] = useMutation(ARTIST_LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      if (formState.acctType === 'user') {
        const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      }
      else if (formState.acctType === 'artist') {
        const mutationResponse = await artistLogin({ variables: { email: formState.email, password: formState.password } })
        const token = mutationResponse.data.artistLogin.token;
        Auth.login(token);
      }
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
      <Box m={3} />
      <div mt="4" class=".MuiFormControl-fullWidth	">
        <FormControl onSubmit={handleFormSubmit}>
          <div class=".MuiFormControl-fullWidth	">

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


          </div>
        </FormControl>
      </div>
    </Container>
  );
}


export default Login;
