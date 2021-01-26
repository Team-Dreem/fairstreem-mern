import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Auth from '../../utils/auth'
 
import Button from '@material-ui/core/Button'



export default function LikeButton(){

    const listenerId = Auth.getProfile().data._id || null
    

    function handleClick(){
        console.log("like btn clicked");
       
        
    }

    return(
        <Button onClick={handleClick}>Like</Button>
    )
}