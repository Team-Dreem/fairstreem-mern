import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN, ARTIST_LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";
import { FormControl, InputLabel, Select, TextField, Button } from "@material-ui/core";
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
    <Container maxWidth="sm" className="login-form">

      <h2>Login</h2>
      <Box m={3} />
      <FormControl fullWidth={true} margin="normal" onSubmit={handleFormSubmit}>
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
      {
        error ? <div>
          <p className="error-text" >The provided credentials are incorrect</p>
        </div> : null
      }
      <Button variant="contained" className="btn">Submit</Button>
    </Container>
  );
}


export default Login;
