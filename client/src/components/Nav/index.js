import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_ME } from '../../utils/queries';
import { UPDATE_CURRENT_USER } from '../../utils/actions';
import { makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  listenerLink: {
    display: 'flex',
    alignItems: 'center'
  },
  listenerIcon: {
    marginRight: 5
  }
}));

function Nav() {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_ME);
  const { currentUser } = state;
  const classes = useStyles();

  useEffect(() => {
    if (data && data.me) {
        const { me } = data;

        dispatch({
            type: UPDATE_CURRENT_USER,
            currentUser: me
        });
      }
    }, [loading, data]);

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="nav-link">
            <Link to="/listener" className={classes.listenerLink}>
              <PersonIcon className={classes.listenerIcon} />
              { currentUser.username }
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/orderHistory">
              Order History
              {/* Change to view Profile? */}
            </Link>
          </li>
          <li className="nav-link">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
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
