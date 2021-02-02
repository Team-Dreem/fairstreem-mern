import React, { useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { ADD_COMMENT } from "../../utils/mutations";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_ARTIST_COMMENTS } from '../../utils/actions';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%'
    },
    commentFooter: {
        display: 'flex',
        marginTop: theme.spacing(2)
    },
    commentButton: {
        marginRight: 'auto'
    }
}));

const ReplyForm = ({ comments }) => {
    const [state, dispatch] = useStoreContext();
    const classes = useStyles();
    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment] = useMutation(ADD_COMMENT);
    const apolloClient = useApolloClient();

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add comment to database. the commentText comes from useState hook that is updated in handleChange()
            const { data } = await addComment({
                variables: {
                    commentText: commentText,
                    artistId
                }
            });

            const { addComment: comments } = data;

            // clear form value
            setText('');
            setCharacterCount(0);

            dispatch({
                type: UPDATE_ARTIST_COMMENTS,
                _id: artistId,
                comments
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    return (
        <div className="comment">
            <form onSubmit={handleFormSubmit} className={classes.form}>
                <TextField
                    className="comment-field"
                    id="outlined-multiline-static"
                    label="Comment"
                    multiline
                    rows={5}
                    fullWidth={true}
                    variant="outlined"
                    placeholder="What do you think?"
                    value={commentText}
                    onChange={handleChange}
                />

                <footer className={classes.commentFooter}>
                    <Button className={classes.commentButton} type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                    <span className={characterCount === 280 ? 'text-error' : ''}>
                        {characterCount}/280 characters
                    </span>
                </footer>
            </form>
        </div>
    )

}
export default ReplyForm;
