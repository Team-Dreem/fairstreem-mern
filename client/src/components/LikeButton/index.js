import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_FOLLOW, ADD_FOLLOWER } from '../../utils/mutations'
import { useStoreContext } from "../../utils/GlobalState";

import Auth from '../../utils/auth'

import Button from '@material-ui/core/Button'




export default function LikeButton() {
    const [state, dispatch] = useStoreContext();

    const listenerId = Auth.getProfile().data._id || null
    
    

    const [addFollow, { error }] = useMutation(ADD_FOLLOW)
    const [addFollower, { e }] = useMutation(ADD_FOLLOWER)

        //add Artist to User
        async function addFollowFunction()  {
        try {
            await addFollow({
                variables: { artistId: state.selectedArtist._id }
            })
        }
        catch (e) {
            console.log(e);

        }
    }

    //     //add User to Artist
        async function addFollowerFunction() {
        try {
            await addFollower({
                variables: { artistId: state.selectedArtist._id }
            })
        } catch (e) {
            console.log(e);
        }

    }


    return (
        <Button onClick={()=>{
            console.log("selected ARTIST",state.selectedArtist);
            console.log("LISTENERID", listenerId);
            addFollowFunction();
            addFollowerFunction()
            // try {
            //     await addFollower({
            //         variables: { userId: listenerId }
            //     })
            // } catch (e) {
            //     console.log(e);
            // }

            // try {
            //     await addFollow({
            //         variables: { artistId: state.selectedArtist._id }
            //     })
            // }
            // catch (e) {
            //     console.log(e);
    
            // }


            
            
        }}>Like</Button>
    )
}
