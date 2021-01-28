import React from 'react';
import { useStoreContext } from "../utils/GlobalState";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import getLetterAvatar from '../utils/getLetterAvatar';
import SearchCard from '../components/SearchCard';
import { UPDATE_USER_AVATAR } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { post } from 'axios';
import FileUploadButton from '../components/FileUploadButton';

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
    const [updateUserAvatar] = useMutation(UPDATE_USER_AVATAR);
    const classes = useStyles();

    const [state] = useStoreContext();
    const { currentUser } = state;

    const uploadNewAvatar = (files) => {
        if (files.length === 0) {
            return
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const url = "/api/v1/image-upload";
        const formData = new FormData();
        formData.append("image", files[0]);

        post(url, formData, config)
            .then((response) => {
                return updateUserAvatar({
                    variables: {
                        avatarUrl: response.data.imageUrl
                    }
                });
            });
    };

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
                    <FileUploadButton onChange={uploadNewAvatar} />
                </div>
                <Grid container spacing={2}>
                    {currentUser.follows && currentUser.follows.map(artist => <Grid item sm={3} key={artist._id}>
                        <SearchCard data={artist} />
                    </Grid>)}
                </Grid>
            </div>
        </>
    );
}

export default ListenerProfile;