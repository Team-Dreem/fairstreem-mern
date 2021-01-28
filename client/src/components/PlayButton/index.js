import React from 'react';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Button from "@material-ui/core/Button";


export default function PlayButton(props){

function playClick(){
    console.log("PROPS", props);
    
    //mutation to up playcount by one
    //get song_url
    const song = new Audio(props.song_url)
    song.play()
}


    <Button>
        <PlayArrowIcon onClick={playClick}></PlayArrowIcon>
    </Button>
}