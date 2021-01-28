
import React, { useEffect, useState } from 'react';
// import { useStoreContext } from "../../utils/GlobalState";
// import { useQuery } from "@apollo/react-hooks";
import { useMutation } from '@apollo/react-hooks';
// import { QUERY_ARTISTS, QUERY_COMMENTS } from "../../utils/queries";
import { ADD_COMMENT } from "../../utils/mutations";
// import { idbPromise } from "../../utils/helpers";
// import Auth from '../../utils/auth'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const CommentForm = (props) => {
    // const [state, dispatch] = useStoreContext();
    // const { loading, data } = useQuery(QUERY_ARTISTS);
    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    // console.log("data", data);
  
    const [addComment] = useMutation(ADD_COMMENT);



    const handleFormSubmit = async event => {
        // console.log(Auth.getProfile());

        event.preventDefault();
        try {
            // add comment to database. the commentText comes from useState hook that is updated in handleChange()
            await addComment({
                variables: {
                    commentText: commentText,
                    artistId: props.artistId
                }
            });

            // clear form value
            setText('');
            setCharacterCount(0);
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
        <Grid container component={Paper}  >

            <Grid item xs={12}>
                <p className={characterCount === 280 ? 'text-error' : ''}>
                    Character Count: {characterCount}/280
            </p>
            </Grid>


            <form onSubmit={handleFormSubmit}>
                <Grid item xs={12}>
                    <textarea
                        placeholder="What do you think?"
                        value={commentText}

                        onChange={handleChange}
                    >
                    </textarea>
                </Grid>

                <Button type="submit">
                    Submit
                </Button>
            </form>

        </Grid>
    )

}
export default CommentForm;


    // useEffect(() => {
    //   async function saveComment() {
    //     const comments = comments.map((item) => item._id);

    //     if (comments.length) {
    //       const { data } = await addComment({ variables: { comments } });
    //       const commentData = data.addComment.comments;

    //       commentData.forEach((item) => {
    //         idbPromise("cart", "delete", item);
    //       });
    //     }
    //   }

    //   saveComment();
    // }, [addComment]);

    //  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    //     update(cache, { data: { addComment } }) {
    //       try {
    //         // could potentially not exist yet, so wrap in a try...catch
    //         const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
    //         cache.writeQuery({
    //           query: QUERY_COMMENTS,
    //           data: { comments: [addComment, ...comments] },
    //         });
    //       } catch (e) {
    //         console.error(e);
    //       }
    //       // update me object's cache, appending new comment to the end of the array
    //       const { currentArtist } = state;
    //       cache.writeQuery({
    //         query: QUERY_ARTISTS,
    //         data: { artist: { ...artist, comments: [...artist.comments, addComment] } },
    //         // Thankfully, you usually only have to manually update the cache when adding or deleting items from an array. You won't need to perform any cache updates for the next feature, the Add Reaction form.
    //       });
    //     },
    //   });