import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
    }
}));

const FileUploadButton = ({ onChange = (files) => {} }) => {
    const classes = useStyles();

    const fileSelected = (event) => {
        const { files } = event.currentTarget;
        onChange(files);
    };

    return <div>
        <input accept="image/*" className={classes.input} id="avatar" type="file" onChange={fileSelected} />
        <label htmlFor="avatar">
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
    </div>;
};

export default FileUploadButton;