import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: "100%"
    },
    media: {
        height: 140,
    },
});

function SearchCard({ data }) {
    const classes = useStyles();
    const placeholder = () => !data.avatar ? <div className="MuiCardMedia-root makeStyles-media-7"/> : null;

    return (
        <Card className={classes.root}>
            <Link to={`/artists/${data._id}`}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={data.avatar || 'http://placehold.it/500x500?text=%20'}
                    />
                    <CardContent>
                        <Typography className="artist-name" gutterBottom variant="h5" component="h2">
                            { data.artistName }
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}

export default SearchCard;