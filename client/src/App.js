import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success";
import ArtistProfile from "./pages/ArtistProfile";
import SongDetail from "./pages/SongDetail";
import ListenerProfile from "./pages/ListenerProfile";
import { ThemeProvider } from "@material-ui/core";
import { lightTheme } from './utils/theme';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={lightTheme}>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/songs/:id" component={Detail} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/artists/:artistId" component={ArtistProfile} />
              {/* <Route exact path="/artists/:artistName/:artistId/songs" component={SongListByArtist} /> */}
              <Route exact path="/artists/:artistName/:artistId/songs/:songId" component={SongDetail} />
              <Route exact path="/listener" component={ListenerProfile} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}
// Did you notice how we use the <StoreProvider> to wrap all of our components? Everything between those JSX tags are considered the children of <StoreProvider>; that's why it was so important that we had ...props in the definition of our StoreProvider function!

export default App;
