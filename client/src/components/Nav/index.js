import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME, QUERY_ME_ARTIST } from '../../utils/queries';
import { UPDATE_CURRENT_USER, UPDATE_CURRENT_ARTIST } from '../../utils/actions';
import { makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Cart from '../Cart';

const useStyles = makeStyles((theme) => ({
  userLink: {
    display: 'flex',
    alignItems: 'center'
  },
  listenerIcon: {
    marginRight: 5
  }
}));

function Nav() {
  const [state, dispatch] = useStoreContext();
  const { data: listenerData } = useQuery(QUERY_ME);
  const { data: artistData } = useQuery(QUERY_ME_ARTIST);
  const { currentUser, currentArtist } = state;
  const classes = useStyles();

  useEffect(() => {
    if (listenerData && listenerData.me) {
      const { me } = listenerData;

      dispatch({
          type: UPDATE_CURRENT_USER,
          currentUser: me
      });
    }
  }, [listenerData, dispatch]);

  useEffect(() => {
    if (artistData && artistData.meArtist) {
      const { meArtist } = artistData;

      dispatch({
          type: UPDATE_CURRENT_ARTIST,
          currentArtist: meArtist
      });
    }
  }, [artistData, dispatch]);

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="nav-link">
            { currentUser && currentUser._id && <Link to="/listener" className={classes.userLink}>
              <PersonIcon className={classes.listenerIcon} />
              { currentUser.username }
            </Link> }
            { currentArtist && currentArtist._id && <Link to={`/artists/${currentArtist._id}`} className={classes.userLink}>
              <PersonIcon className={classes.listenerIcon} />
              { currentArtist.artistName }
              </Link>}
          </li>
          { currentUser && currentUser._id && <li className="nav-link">
          <Link to="/orderHistory">
              Order History
              {/* Change to view Profile? */}
            </Link>
          </li> }
          <li className="nav-link">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          { currentUser && currentUser._id && <li className="nav-link cart-link">
           <Cart />
          </li> }
        </ul>
      );
    } else {
      return (
        <ul className="nav flex-row">
          <li className="nav-link">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <div id='bars'>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </div>
          <div className='name'><span id="fair">fair</span><span id="streem">streem</span></div>
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
