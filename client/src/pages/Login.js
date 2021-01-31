import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN, ARTIST_LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import { FormControl, InputLabel, Select, TextField, Button } from "@material-ui/core";
import Container from '@material-ui/core/Container';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '', accountType: 'listener' });
  const [login, { error }] = useMutation(LOGIN);
  const [artistLogin, { error: artistError }] = useMutation(ARTIST_LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault(); 
    try {
      if (formState.accountType === 'listener') {
        const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      }
      else if (formState.accountType === 'artist') {
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
    <Container maxWidth="sm" className="login-form">
      <h2>Login</h2>

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
        label="Email Address"
        fullWidth
        margin="normal"
        name="email"
        type="email"
        onChange={handleChange}
      />

      <TextField
        className="input"
        required
        label="Password"
        fullWidth
        margin="normal"
        name="password"
        type="password"
        id="pwd"
        onChange={handleChange}
      />
      {
        error ? <div>
          <p className="error-text" >The provided credentials are incorrect</p>
        </div> : null
      }
      {
        artistError ? <div>
          <p className="error-text" >The provided credentials are incorrect</p>
        </div> : null
      }
      <Button variant="contained" color="primary" className="btn" onClick={handleFormSubmit}>Log In</Button>
    </Container>
  );
}


export default Login;
