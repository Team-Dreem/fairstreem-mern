
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { QUERY_ME, QUERY_COMMENTS } from "../../utils/queries";
import { ADD_COMMENT } from "../../utils/mutations";

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

 export default function CommentForm(){

    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // const addComment = useMutation(ADD_COMMENT)
    const [addComment, { error }] = useMutation(ADD_COMMENT, {
        update(cache, { data: { addComment } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { comments } = cache.readQuery({ query: QUERY_COMMENTS });
            cache.writeQuery({
              query: QUERY_COMMENTS,
              data: { comments: [addComment, ...comments] },
            });
          } catch (e) {
            console.error(e);
          }
          // update me object's cache, appending new comment to the end of the array
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, comments: [...me.comments, addComment] } },
            // Thankfully, you usually only have to manually update the cache when adding or deleting items from an array. You won't need to perform any cache updates for the next feature, the Add Reaction form.
          });
        },
      });

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            // add comment to database. the commentText comes from useState hook that is updated in handleChange()
            // await addComment({
            //   variables: { commentText }
            // });
        
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

    return(
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
