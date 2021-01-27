import React, { useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { ADD_SONG } from '../../utils/mutations'

//material ui components
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';

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

    const [formState, setFormState] = useState({ title: "", price: "", description: "", genre: "", song_url: "" });
    const [addSong] = useMutation(ADD_SONG);

//handlers and mutations
    const handleFormSubmit = async (event) => {
        console.log(("form Submit"));
        await addSong({
            variables: {
                title: formState.title,
                price: formState.price,
                description: formState.description,
                genre: formState.genre,
                song_url: formState.song_url
            }
        })
    }
    
    function handleChange(event) {
        console.log("handleChange");
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

//jsx
    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Add Song
      </button>
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
                                    id="title"
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label for="price">Price:</label>
                                <input placeholder="1.99"
                                    id="price"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label for="description">Description:</label>
                                <input
                                    id="description"
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label for="genre">Genre:</label>
                                <input
                                    id="genre"
                                    onChange={handleChange}
                                />
                            </div>

                            <label for="song">Upload song!</label>
                            <input id="song" name="song" type="file"></input>
                        </form>
                        <Button onClick={handleFormSubmit}>Add Song</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
