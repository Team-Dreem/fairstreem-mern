import React, { useEffect } from 'react';
import { useStoreContext } from "../utils/GlobalState";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from "@apollo/react-hooks";
import { UPDATE_CURRENT_USER } from '../utils/actions';
import getLetterAvatar from '../utils/getLetterAvatar';
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
    large: {
        width: 250,
        height: 250,
        margin: '50px auto -125px',
        fontSize: 72
    },
    input: {
        display: "none"
    }
}));

function ListenerProfile() {
    const classes = useStyles();

    const [state, dispatch] = useStoreContext();
    const { currentUser } = state;

    const { loading, data } = useQuery(QUERY_ME);

    useEffect(() => {
        if (data && data.me) {
            const { me } = data;

            dispatch({
                type: UPDATE_CURRENT_USER,
                currentUser: me
            });
        }
    }, [loading, data]);

    return (
        <>
            <Avatar
                src={currentUser.avatar}
                className={classes.large}>
                {getLetterAvatar(currentUser.username)}
            </Avatar>
            <div className="profile">
                <div className="profile-header">
                    <h1>{currentUser.username}</h1>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <Grid>

                </Grid>
            </div>
        </>
    );
}

export default ListenerProfile;