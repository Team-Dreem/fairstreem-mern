import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { ADD_SONG } from '../../utils/mutations'
import axios, { post } from 'axios'
import { useStoreContext } from "../../utils/GlobalState";
//material ui components
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FormControl, InputLabel, Select, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function AddSongModal() {
    //styles
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //initialize empty state for all form inputs
    const [formState, setFormState] = useState({ title: "", price: 0, description: "", genre: "", file: "", album: "" });
    const [addSong] = useMutation(ADD_SONG);
    //will extract artistId from global state
    const [state, dispatch] = useStoreContext();


    //handlers and mutations
    const handleFormSubmit = async (event) => {
        event.preventDefault();
       
        //    console.log("FORMSTATE", formState.file)
        //    console.log("FORM", document.getElementById("file").files[0])

        //create variables to send to AWS s3 bucket, receive song url in response
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const url = "/api/v1/song-upload"
        const formData = new FormData()
        formData.append("song", document.getElementById("file").files[0])
        console.log("FORMDATA", formData.get("song"))
        post(url, formData, config)
            .then((response) => {
                console.log("AWS url", response.data.song_url);

                const price = parseFloat(formState.price)
                /// graph ql mutation to add song to mongoDB
                addSong({
                    variables: {
                        title: formState.title,
                        price: price,
                        description: formState.description,
                        genre: formState.genre,
                        song_url: response.data.song_url,

                        album: formState.album,

                    }
                })
            })

    }
    //update the state every time input is changed to keep track of input, to send to mutation
    function handleChange(event) {
        console.log("handleChange");
        const { name, value } = event.target;
        if (name === "file") {
            setFormState({
                ...formState,
                file: event.target.files[0]
            })
        }
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    //jsx
    return (
        <div>
            <Button className="add-song-btn" size="large" type="button" onClick={handleOpen}>
                Add Song
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Add Song</h2>
                        <p id="transition-modal-description">

                        </p>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label for="title">Title:</label>
                                <input
                                    name="title"
                                    id="title"
                                    onChange={handleChange} />
                            </div>

                            <div>
                                <label for="album">Album:</label>
                                <input
                                    name="album"
                                    id="album"
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label for="price">Price:</label>
                                <input placeholder="1.99"
                                    name="price"
                                    id="price"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label for="description">Description:</label>
                                <input
                                    name="description"
                                    id="description"
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <Select
                                    required
                                    native
                                    fullWidth
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'genre',
                                        id: 'genre',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'600dfabaebcba48440047d26'}>Rock/Alternative</option>
                                    <option value={"600dfabaebcba48440047d2d"}>Classical</option>
                                    <option value={"600dfabaebcba48440047d2c"}>Blues</option>
                                    <option value={"600dfabaebcba48440047d2b"}>Jazz</option>
                                    <option value={"600dfabaebcba48440047d28"}>Country</option>
                                    <option value={"600dfabaebcba48440047d2a"}>Electronic</option>
                                    <option value={"600dfabaebcba48440047d29"}>Hip Hop</option>
                                    <option value={"600dfabaebcba48440047d27"}>R and B</option>
                                    <option value={"600dfabaebcba48440047d2e"}>Other</option>
                                </Select>
                            </div>



                            <label for="file">Upload song!</label>
                            <input id="file" name="file" type="file"
                                onChange={handleChange}></input>
                        </form>
                        <Button onClick={handleFormSubmit}>Add Song</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
