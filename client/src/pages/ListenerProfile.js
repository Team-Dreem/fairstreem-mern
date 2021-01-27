import React from 'react';
import { useStoreContext } from "../utils/GlobalState";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import getLetterAvatar from '../utils/getLetterAvatar';
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SearchCard from '../components/SearchCard';

const useStyles = makeStyles((theme) => ({
    large: {
        width: 250,
        height: 250,
        margin: '50px auto -125px',
        fontSize: 72
    },
    input: {
        display: "none"
    },
    icon: {
        position: 'absolute'
    }
}));

function ListenerProfile() {
    const classes = useStyles();

    const [state] = useStoreContext();
    const { currentUser } = state;

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
                        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.iconLabel}>
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <Grid>
                    {currentUser.follows.map(artist => <SearchCard data={artist} />)}
                </Grid>
            </div>
        </>
    );
}

export default ListenerProfile;