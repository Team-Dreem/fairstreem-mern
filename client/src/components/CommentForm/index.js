
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
//make mutation
// import { ADD_COMMENT } from '../../utils/mutations';

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'






 export default function CommentForm(){

    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // const addComment = useMutation(ADD_COMMENT)


    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            // add thought to database. the thoughtText comes from useState hook that is updated in handleChange()
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
